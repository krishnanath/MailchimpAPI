const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

//BodyParser
app.use(bodyParser.urlencoded({extended: true}))


// Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Signup Route
app.post('/signup', (req, res)=> {

   const { firstName, lastName, email} = req.body;

   if(!firstName || !lastName || !email) { 
       res.redirect('/failed.html');
       return;


   }

   //Construct re data

   const data = {
       members: [
           {
               email_address:email,
               status:'subscriber',
               merge_fields:{
                   FNAME: firstName,
                   LNAME: lastName
               }
           }
       ]
   }

   const postData = JSON.stringify(data);

   const options ={
    url: 'https://us17.api.mailchimp.com/3.0/lists/14ba5b800b',
    method: 'POST',
    headers: {
        Authorization: 'auth eba8ee02ab7fac48021a95335234c57a-us17'
    },
    body:postData


   }

request(options, (err, response, body) => {
 
    if(err) {
        res.redirect('/failed.html');

    }else {
        if(response.statusCode === 200){
            res.redirect('/success.html');

        }else {
            res.redirect('/failed.html');
        }
    }
     

});

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));


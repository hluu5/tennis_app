const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-nodejs');
const User = require('../database-mongo/index.js').User;
const createUser = require('../database-mongo/helper.js').createUser;

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/items', function (req, res) {
//   items.selectAll(function(err, data) {
//     if(err) {
//       res.jsonStatus(500);
//     } else {
//       res.end(data);
//     }
//   });
// });

app.post('/create', function(req,res){
  createUser(req.body.username,
		req.body.firstName,
		req.body.lastName,
		req.body.password,
		req.body.email,
		req.body.city,
		req.body.state,
		req.body.country,
    Number(req.body.zipcode),
    (data) => {
      console.log('User Created: ', data)
      res.status(200);
      res.end();
    },
    (err) => {
      if (err.code === 11000) {
        console.log('Error: This user has already been created');
      } else {
        console.log(err)
      }
      res.end();
    });
})

app.get('/checkUserName', (req, res)=>{
  if(req.body.username) {
    User.find({username: req.body.username}).then((data)=>{
      if(data.length!==0) {
        res.json('username has already been used');
      } else {
        res.json('false');
      }
    }).catch(err=>{
      res.json(err);
    })
  }
});

app.get('/checkEmail', (req, res)=>{
  if(req.body.email) {
    User.find({email: req.body.email}).then((data)=>{
      if(data.length!==0) {
        res.json('email has already been used');
      } else {
        res.json('false');
      }
    }).catch(err=>{
      res.end(err);
    })
  }
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


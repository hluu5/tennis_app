const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt');
const User = require('../database-mongo/index.js').User;
const createUser = require('../database-mongo/helper.js').createUser;
const db = require('../database-mongo/index.js').db;
const app = express();
// const cors = require('cors');

// app.use(cors({origin: 'http://localhost:3001/'}));

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(session({
  secret: 'MVP',
  resave: false,
  saveUninitialized: true,
  cookie: {
		maxAge: 20000
	},
	store: new MongoStore({ mongooseConnection: db })
}))


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
        res.send('Error: This user has already been created');
      } else {
        res.json(err);
      }
      res.end();
    });
})

app.post('/checkUserName', (req, res)=>{
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

app.get('/isLoggedIn', (req, res) => {
  console.log(req.session)
  if (req.session.user) {
    res.json('true');
  } else {
    res.json('false');
  }
})

app.post('/checkPassword', (req, res)=>{
  if(req.body.username) {
    User.findOne({username: req.body.username}).exec().then((data)=>{
      if (data === null) {
        res.send('User does not exist')
      } else {
        // console.log('req.body.password', req.body.password, 'data.password',  data.password)
        bcrypt.compare(req.body.password, data.password, function (err, response) {
          console.log("hash is correct" , response);
          // console.log('err', err)
          if(response === true) {
            // Do something with session
            req.session.user = req.body.username;
            res.json('true');
            // res.status(301).redirect('http://localhost:3002');
          } else {
            res.json('false');
          }
        })
      }
    }).catch(err => console.log("ERRROR", err))
  }
});

// app.get('/messaging', function(req,res){
//   res.redirect('http://localhost:3002');
// })

app.post('/checkEmail', (req, res)=>{
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

app.listen(3001, function() {
  console.log('listening on port 3001!');
});


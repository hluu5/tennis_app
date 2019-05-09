const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt');
const User = require('../database-mongo/index.js').User;
const createUser = require('../database-mongo/helper.js').createUser;
const createMessage = require('../database-mongo/helper.js').createMessage;
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
		maxAge: 360000
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
    req.body.ntrp,
    req.body.strengths,
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

app.get('/getUserName', (req, res)=>{
  if(req.session.user) {
    res.json(req.session.user)
  } else {
    res.json("Session Expired, Please login again")
  }
})

app.get('/getMessagingLink', (req, res)=>{
  if(req.session.user) {
    res.json('http://localhost:3002')
  } else {
    res.json("Session Expired, Please login again")
  }
})

app.post('/createMessage', (req,res)=>{
  // console.log(req)
  if (req.session.user) {
    createMessage(
      req.body.user,
      req.body.roomUsers,
      req.body.message,
      (data) => {
        console.log('Message Created: ', data)
        res.status(200);
        res.end();
      },
      (err) => {
        res.json(err);
        res.end();
      });
  } else {
    res.json('User needs to login first')
  }
})

app.post('/usersList',(req,res)=>{
  console.log(req);
  if (req.session.user) {
    if(req.body.ntrp === null) {
      User.find({
        $and: [
          {ntrp: {$gte: 3, $lt: 6}},
          {strengths: {$all: req.body.strengths}}
        ]
      })
      .then(data=>{res.json(data)})
      .catch(err=>res.json(err))
    } else {
      User.find({
        $and: [
          {ntrp: req.body.ntrp},
          {strengths: {$all: req.body.strengths}}
        ]
      })
      .then(data=>{res.json(data)})
      .catch(err=>res.json(err))
    }
  } else {
    res.json('User need to login first')
  }
})

app.listen(3001, function() {
  console.log('listening on port 3001!');
});


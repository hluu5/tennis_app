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
const cors = require('cors');
const key = require('../env.js').key;
const axios = require('axios');
app.use(cors({credentials: true, origin: 'http://localhost:3001/'}));



app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(session({
  name: 'sid',
  secret: 'MVP',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
    httpOnly: true,
    // sameSite: 'lax',
    // domain: '.localhost:3001'
  },
  store: new MongoStore({ mongooseConnection: db })
}))


app.post('/create', function (req, res) {
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

app.post('/checkUserName', (req, res) => {
  if (req.body.username) {
    User.find({ username: req.body.username }).then((data) => {
      if (data.length !== 0) {
        res.json('username has already been used');
      } else {
        res.json('false');
      }
    }).catch(err => {
      res.json(err);
    })
  }
});

app.get('/isLoggedIn', (req, res) => {
  console.log(req.session.user)
  if (req.session.user) {
    req.session.pageNumber = 1;
    res.json('true');
  } else {
    res.json('false');
  }
})

app.post('/checkPassword', (req, res) => {
  if (req.body.username) {
    User.findOne({ username: req.body.username }).exec().then((data) => {
      if (data === null) {
        res.send('User does not exist')
      } else {
        // console.log('req.body.password', req.body.password, 'data.password',  data.password)
        bcrypt.compare(req.body.password, data.password, function (err, response) {
          console.log("hash is correct", response);
          // console.log('err', err)
          if (response === true) {
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

app.post('/checkEmail', (req, res) => {
  if (req.body.email) {
    User.find({ email: req.body.email }).then((data) => {
      if (data.length !== 0) {
        res.json('email has already been used');
      } else {
        res.json('false');
      }
    }).catch(err => {
      res.end(err);
    })
  }
})

app.get('/getUserName', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.json("Session Expired, Please login again")
  }
})

app.get('/getMessagingLink', (req, res) => {
  if (req.session.user) {
    res.json('http://localhost:3002')
  } else {
    res.json("Session Expired, Please login again")
  }
})

app.post('/postMessage', (req, res) => {
  console.log(req.headers);
  console.log(req.session.user);
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

app.post('/usersList', (req, res) => {
  console.log(req.headers);
  console.log(req.session.user);
  let pointA = { latitude: null, longitude: null };
  let pointB = { latitude: null, longitude: null };
  async function getDistance(zipcode) {
    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${req.body.zipcode || null}`)
      .then(data => {
        pointA.latitude = data.data.results[0].geometry.location.lat;
        pointA.longitude = data.data.results[0].geometry.location.lng;
      })
      .catch(err => console.log(err))

    await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${zipcode}`)
      .then(data => {
        pointB.latitude = data.data.results[0].geometry.location.lat;
        pointB.longitude = data.data.results[0].geometry.location.lng;
      })
      .catch(err => console.log(err))

    //distance between pointA to pointB converted from km to miles
    return (geolib.getDistance(
      pointA,
      pointB,
      1, 1
    ) / 1.6 / 1000)
  }

    if (req.session.user) {
      User.find({
        $and: [
          { ntrp: req.body.ntrp === null ? { $exists: true } : req.body.ntrp },
          { strengths: req.body.strengths.length === 0 ? { $exists: true } : { $all: req.body.strengths } }
          // { zipcode: }
        ]
      }).limit(10)
        .skip((req.session.pageNumber - 1)*10 || 0)
        .then(data => {
          // req.user.pagenumber = (req.user.pagenumber - 1) * 10 || 1;
          res.json(data)
        })
        .catch(err => res.json(err))
    } else {
      res.json('User need to login first')
    }
  })

app.post('/setNextPaginationPage', (req,res)=>{
  if(req.session.user) {
    req.session.pageNumber = req.body.page
  }
  res.status(200).json({"Current Page": req.session.pageNumber})
})

app.post('/setPrevPaginationPage', (req,res)=>{
  if(req.session.user) {
    req.session.pageNumber = req.body.page
  }
  res.status(200).json({"Current Page": req.session.pageNumber})
})

app.post('/location', (req, res) => {
  console.log(req.body);
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=${req.body.zipcode}`)
    .then(data => res.json(data.data.results[0].geometry.location))
    .catch(err => res.json(err))
})

app.post('/setNewUser', (req,res)=> {
  req.session.otherUser = req.body.otherUser;
  res.json('New User Set')
})

app.post('/logout', (req,res)=> {
  console.log(req.session)
  if(req.session.user) {
    req.session.destroy(()=>{
      res.json('Logged out')
    });
  }

})

app.listen(3001, function () {
  console.log('listening on port 3001!');
});


var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const faker = require('faker');
const randomImage = faker.image.avatar;

mongoose.connect('mongodb://localhost/letshit', {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  username: {type: String, unique: true, dropDups: true, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, unique: true, dropDups: true, required: true},
  city: String,
  state: String,
  country: String,
  zipcode: Number,
  ntrp: Number,
  userThumbnail: String,
  strengths: [String]
});

userSchema.pre('save', function(next){
  if(!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  this.userThumbnail = randomImage();
  next();
})

const User = mongoose.model('users', userSchema);

var messageSchema = mongoose.Schema({
  user: {type: String, required: true},
  roomUsers: {type: String, required: true},
  message: String
}, {timestamps: true});

const Message = mongoose.model('messages', messageSchema);

module.exports.User = User;
module.exports.db = db;
module.exports.Message = Message;
var mongoose = require('mongoose');
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
  zipcode: Number
});

var User = mongoose.model('users', userSchema);


module.exports.User = User;
let User = require('./index.js').User;

const createUser = (username, firstName, lastName, password, email, city, state, country, zipcode)=>{
   let newUser = new User({
    username,
    firstName,
    lastName,
    password,
    email,
    city,
    state,
    country,
    zipcode
   });
   newUser.save().then(()=>{
       console.log('User Created')
   }).catch(err=>{
       console.log(err)
   })
}


module.exports.createUser = createUser;

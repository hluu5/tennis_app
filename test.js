const User = require('./database-mongo/index.js').User;
const bcrypt = require('bcrypt');
const axios = require('axios');
const key = require('./env.js').key;
console.log(key);
// User.findOne({
//     username: "Mail"
// }).exec().then(data=>console.log("DATAAAA", data)).catch(err=>console.log("ERRROR", err))

// User.findOne({email: 'lmhuy_lmhuy@yahoo.comrwqrqwrqw'}).exec().then(data=>{
//     console.log("DATAAAA", data);
//     bcrypt.compare('rqwfwqfqw231', data.password, function(err, res) {
//         console.log(res);
//     });
// })
// .catch(err=>console.log("ERRROR", err))

// axios.post('http://localhost:3001/usersList', {
//     ntrp: 4.5
// }).then(data=>console.log(data)).catch(err=>console.log(err))

// const faker = require('faker');
// const randomImage = faker.image.avatar();
// console.log(randomImage)

// User.find({
//     $and: [
//       {ntrp: {$gte: 3, $lt: 6} },
//       {strengths: {$all: ["Grinder"]}}
//     ]
//   })
//   .then(data=>{console.log(data)})
//   .catch(err=>console.log(err))

axios.post(`http://localhost:3001/location`, {
		zipcode: 92864
})
	.then(data => console.log(data.data))
	.catch(err => console.log(err))
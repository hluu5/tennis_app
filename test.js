const User = require('./database-mongo/index.js').User;
const bcrypt = require('bcrypt');
const axios = require('axios');
const key = require('./env.js').key;
const faker = require('faker');
// console.log(key);
const geolib = require('geolib');
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
// let pointA  = {latitude: null, longitude: null};
// let pointB = {latitude: null, longitude: null};
// async function test() {
// 	await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=null`)
// 	  .then(data=>{
// 		  console.log(data.data)
// 		//   pointA.latitude = data.data.results[0].geometry.location.lat;
// 		//   pointA.longitude = data.data.results[0].geometry.location.lng;
// 		})
// 	  .catch(err=>console.log(err))

// 	await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=${key}&address=null`)
// 	  .then(data=>{
// 		console.log(data.data)
// 		// pointB.latitude = data.data.results[0].geometry.location.lat;
// 		// pointB.longitude = data.data.results[0].geometry.location.lng;
// 		})
// 	  .catch(err=>console.log(err))


// 	// console.log(geolib.getDistance(
// 	// 	pointA,
// 	// 	pointB,
// 	// 	1,1
// 	// )/1.6/1000);

// }

// test();
// User.find({
// 	$and: [
// 	  {ntrp: {$gte: 3, $lt: 6}},
// 	  {strengths: null || ['Strong Backhand']}
// 	]
//   })
//   .then(data=>{console.log(data)})
//   .catch(err=>console.log(err))
// const items = [92867, 92606, 90039, 90621, 90631, 92801, 92850]
// async function submitForm() {
// 	let options = {
// 		username: await faker.internet.userName(),
// 		firstName: await faker.name.firstName(),
// 		lastName: await faker.name.lastName(),
// 		password: 1,
// 		email: await faker.internet.email(),
// 		city: await faker.address.city(),
// 		state: await faker.address.state(),
// 		country: await faker.address.country(),
// 		zipcode: items[Math.floor(Math.random()*items.length)],
// 		ntrp: 4.5,
// 		strengths: ['Strong Backhand', 'Strong Forehand']
// 	}
// 	await axios.post('http://localhost:3001/create', options)
// 		.then(data => {
// 			console.log(data.data)
// 		})
// 		.catch(err => {console.log(err);})
// }

// for (let i = 0; i < 10; i++){
// 	submitForm();
// }

const items = ['Huy', 'Idella99', 'Tierra13', 'Eden.Eichmann']
// items[Math.floor(Math.random()*items.length)]
// for (let i = 0; i < 100; i++) {
let options = {
	user: 'Huy',
	roomUsers: [items[Math.floor(Math.random() * items.length)], items[Math.floor(Math.random() * items.length)]],
	message: faker.lorem.sentences(),
	withCredentials: true
}
axios.post('http://localhost:3001/checkPassword', {
	username: 'Huy',
	password: '1',
}).then((data)=>{console.log(data)
	axios.post('http://localhost:3001/postMessage', options)
	.then(data => console.log(data))
	.catch(err => console.log(err))
}).catch(err=>console.log(err))
// }
let User = require('./index.js').User;
let Message = require('./index.js').Message;

const createUser = (username, firstName, lastName, password, email, city, state, country, zipcode, ntrp, strengths, success, error) => {
	let newUser = new User({
		username,
		firstName,
		lastName,
		password,
		email,
		city,
		state,
		country,
		zipcode,
		ntrp,
		strengths
	});
	newUser.save().then((data) => {
		success(data);
	}).catch(err => {
		error(err);
	})
}

const createMessage = (user, roomUsers, message, success, error) => {
	let newMessage = new Message({
		user,
		roomUsers,
		message
	});
	newMessage.save().then((data) => {
		success(data);
	}).catch(err => {
		error(err);
	})
}


module.exports.createUser = createUser;
module.exports.createMessage = createMessage;

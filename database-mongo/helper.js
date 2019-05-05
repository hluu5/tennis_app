let User = require('./index.js').User;

const createUser = (username, firstName, lastName, password, email, city, state, country, zipcode,success,error) => {
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
	newUser.save().then((data) => {
		success(data);
	}).catch(err => {
		error(err);
	})
}


module.exports.createUser = createUser;

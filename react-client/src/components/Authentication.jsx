var session = require('express-session');
var bcrypt = require('bcrypt-nodejs');
const axios = require('axios');

import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

export default class Authentication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			firstName: '',
			lastName: '',
			password: '',
			email: '',
			city: '',
			state: '',
			country: '',
			zipcode: null,
			usernameUsed: null,
			emailUsed: null
		}
	}

	checkUser(username) {
		axios.get({
			url: '/checkUserName',
			body: {
				username,
			}
		}).then(data => {
			if (data === 'false') {
				this.setState({
					usernameUsed: false
				})
			} else if (data === 'username has already been used') {
				this.setState({
					usernameUsed: true
				})
			}
		})
	}

	checkEmail(email) {
		axios.get({
			url: '/checkEmail',
			body: {
				email
			}
		}).then(data => {
			if (data === 'false') {
				this.setState({
					usernameUsed: false
				})
			} else if (data === 'email has already been used') {
				this.setState({
					usernameUsed: true
				})
			}
		})
	}

	changeUserName(username) {
		this.setState({
			username
		})
	}

	changeEmail(email) {
		this.setState({
			email
		})
	}

	changeFirstName(firstName) {
		this.setState({
			firstName
		})
	}

	changeLastName(lastName) {
		this.setState({
			lastName
		})
	}

	changePassword(password) {
		this.setState({
			password
		})
	}

	changeCity(city) {
		this.setState({
			city
		})
	}

	changeState(state) {
		this.setState({
			state
		})
	}

	changeCountry(country) {
		this.setState({
			country
		})
	}

	changeZipcode(zipcode) {
		this.setState({
			zipcode
		})
	}

	render() {
		return (
			<Form>
				{
					this.state.usernameUsed === null ?
						(<FormGroup>
							<Label for="username">Input without validation</Label>
							<Input />
							<FormFeedback>You will not be able to see this</FormFeedback>
							<FormText>Example help text that remains unchanged.</FormText>
						</FormGroup>) :
						this.state.usernameUsed === true ?
							(<FormGroup>
								<Label for="username">Invalid input</Label>
								<Input invalid />
								<FormFeedback>Oh noes! that name is already taken</FormFeedback>
								<FormText>Example help text that remains unchanged.</FormText>
							</FormGroup>) :
							(<FormGroup>
								<Label for="username">Valid input</Label>
								<Input valid />
								<FormFeedback valid>Sweet! that name is available</FormFeedback>
								<FormText>Example help text that remains unchanged.</FormText>
							</FormGroup>)
				}
				<FormGroup>
					<Label for="exampleEmail">Input without validation</Label>
					<Input />
					<FormFeedback tooltip>You will not be able to see this</FormFeedback>
					<FormText>Example help text that remains unchanged.</FormText>
				</FormGroup>
				<FormGroup>
					<Label for="exampleEmail">Valid input</Label>
					<Input valid />
					<FormFeedback valid tooltip>Sweet! that name is available</FormFeedback>
					<FormText>Example help text that remains unchanged.</FormText>
				</FormGroup>
				<FormGroup>
					<Label for="examplePassword">Invalid input</Label>
					<Input invalid />
					<FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback>
					<FormText>Example help text that remains unchanged.</FormText>
				</FormGroup>
			</Form>
		);
	}
}


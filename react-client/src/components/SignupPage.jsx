const axios = require('axios');

import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';

export default class SignupPage extends React.Component {
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
			ntrp: '',
			strengths: [],
			usernameUsed: null,
			emailUsed: null,
			renderLogin: false
		}
		this.setDesiredStrengths = this.setDesiredStrengths.bind(this);
	}

	checkUser(username) {
		console.log('Inside CheckUser');
		axios({
			method: 'POST',
			url: '/checkUserName',
			data: { username: this.state.username }
		}).then(data => {
			console.log(data)
			if (data.data === 'false') {
				this.setState({
					usernameUsed: false
				})
			} else if (data.data === 'username has already been used') {
				console.log('inside username has been used')
				this.setState({
					usernameUsed: true
				})
			}
		}).catch(err => { console.log(err) })
	}

	checkEmail(email) {
		axios({
			method: 'POST',
			url: '/checkEmail',
			data: { email: this.state.email }
		})
			.then(data => {
				console.log(data)
				if (data.data === 'false') {
					this.setState({
						emailUsed: false
					})
				} else if (data.data === 'email has already been used') {
					console.log('inside email has been used')
					this.setState({
						emailUsed: true
					})
				}
			}).catch(err => { console.log(err) })
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

	changeNTRP(ntrp) {
		this.setState({
			ntrp
		})
	}

	async setDesiredStrengths(e) {
		console.log(this.state.strengths)
		if (this.state.strengths.indexOf(e) < 0) {
			await this.setState(prevState => ({
				strengths: [...prevState.strengths, e]
			}))
			await console.log(this.state.strengths);
		}
	}

	async submitForm() {
		await this.checkUser(this.state.username);
		await this.checkEmail(this.state.email);
		// console.log(this.state)
		let options = {
			username: this.state.username,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			password: this.state.password,
			email: this.state.email,
			city: this.state.city,
			state: this.state.state,
			country: this.state.country,
			zipcode: this.state.zipcode,
			ntrp: this.state.ntrp,
			strengths: this.state.strengths
		}
		await axios.post('/create', options)
			.then(data => {
				if(data.data.errors) {
					console.log("error:", data.data.errors)
					this.setState({
						renderLogin: false
					})
				} else {
					this.setState({
						renderLogin: true
					})
				}
			})
			.catch(err => {console.log(err);})
	}

	render() {
		return (
			<div>
				{this.state.renderLogin === false
					? (
					<div style={{ margin: '2em' }}>
						<h1 style={{ marginBottom: '1em' }}>Registration Form:</h1>
						<Form >
							{
								this.state.usernameUsed === null ?
									(<FormGroup>
										<Label for="username">Username</Label>
										<Input value={this.state.username} onChange={
											(e) => { this.changeUserName(e.target.value) }
										} />
										<FormFeedback>You will not be able to see this</FormFeedback>
									</FormGroup>) :
									this.state.usernameUsed === true ?
										(<FormGroup>
											<Label for="username">Username</Label>
											<Input invalid onChange={
												(e) => { this.changeUserName(e.target.value) }
											} />
											<FormFeedback>Oh noes! that name is already taken</FormFeedback>
										</FormGroup>) :
										(<FormGroup>
											<Label for="username">Username</Label>
											<Input valid value={this.state.username} onChange={
												(e) => { this.changeUserName(e.target.value) }
											} />
											<FormFeedback valid>Sweet! that name is available</FormFeedback>
										</FormGroup>)
							}
							{
								this.state.emailUsed === null ?
									(<FormGroup>
										<Label for="email">Email</Label>
										<Input value={this.state.email} onChange={
											(e) => { this.changeEmail(e.target.value) }
										} />
										<FormFeedback>You will not be able to see this</FormFeedback>
									</FormGroup>) :
									this.state.emailUsed === true ?
										(<FormGroup>
											<Label for="email">Email</Label>
											<Input invalid onChange={
												(e) => { this.changeEmail(e.target.value) }
											} />
											<FormFeedback>Oh noes! that email is already taken</FormFeedback>
										</FormGroup>) :
										(<FormGroup>
											<Label for="email">Email</Label>
											<Input value={this.state.email} valid onChange={
												(e) => { this.changeEmail(e.target.value) }
											} />
											<FormFeedback valid>Sweet! that email is available</FormFeedback>
										</FormGroup>)
							}
							<FormGroup>
								<Label for="Password">Password</Label>
								<Input onChange={
									(e) => { this.changePassword(e.target.value) }
								} />
							</FormGroup>
							<FormGroup>
								<Label for="First Name">First Name</Label>
								<Input onChange={
									(e) => { this.changeFirstName(e.target.value) }
								} />
							</FormGroup>
							<FormGroup>
								<Label for="Last Name">Last Name</Label>
								<Input onChange={
									(e) => { this.changeLastName(e.target.value) }
								} />
							</FormGroup>
							<FormGroup>
								<Label for="City">City</Label>
								<Input onChange={
									(e) => { this.changeCity(e.target.value) }
								} />
							</FormGroup>
							<FormGroup>
								<Label for="State">State</Label>
								<Input onChange={
									(e) => { this.changeState(e.target.value) }
								} />
							</FormGroup>
							<FormGroup>
								<Label for="Zipcode">Zipcode</Label>
								<Input onChange={
									(e) => { this.changeZipcode(e.target.value) }
								} />
							</FormGroup>
							<FormGroup>
								<Label for="Country">Country</Label>
								<Input onChange={
									(e) => { this.changeCountry(e.target.value) }
								} />
							</FormGroup>
							<FormGroup>
								<Label for="NTRP">NTRP</Label>
								<Input onChange={
									(e) => { this.changeNTRP(e.target.value) }
								} />
							</FormGroup>
							<FormGroup>
								<Label for="Strengths">Strengths</Label>
								<Input type="select" name="Select Strengths" onChange={(e) => { this.setDesiredStrengths(e.target.value) }}>
									<option >Strong Backhand</option>
									<option >Big Serve</option>
									<option >Strong Forehand</option>
									<option >Net Player</option>
									<option >Grinder</option>
									<option >All-court Player</option>
									<option >Flat Hitter</option>
									<option >Topspin Hitter</option>
								</Input>
							</FormGroup>
						</Form>
						<Button onClick={() => { this.submitForm() }}>SUBMIT FORM</Button>
					</div>)
					: (<h1 style={{ fontFamily: 'Gugi, cursive' , color:'black', margin: '3em'}}>Successed! Please login now</h1>)
				}
			</div>
		);
	}
}


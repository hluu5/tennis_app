
const axios = require('axios');

import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usernameExist: null,
			correctPassword: null,
			password: '',
			username: ''
		}
	}

	changeUserName(username) {
		this.setState({
			username
		})
	}

	changePassword(password) {
		this.setState({
			password
		})
	}

	checkPassword() {
		const options = {
			username: this.state.username,
			password: this.state.password
		};
		axios.post('/checkPassword', options).then(data => {
			if(data.data==='User does not exist') {
				this.setState({
					usernameExist: false
				})
			} else if (data.data === 'false') {
				this.setState({
					usernameExist: true,
					correctPassword: false
				})
			}
			else if (data.data === 'true') {
				this.setState({
					usernameExist: true,
					correctPassword: true
				})
			}
		}).catch(err=>{console.log(err)})
	}


	submitForm(){
		this.checkPassword();
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(prevState);
		if(prevState.usernameExist !== this.state.usernameExist && prevState.correctPassword !== this.state.correctPassword) {
			this.props.checkLogin(this.state.usernameExist, this.state.correctPassword);
		}
	}

	render() {
		return (
			<div style={{ margin: '2em' }}>
				<h1 style={{ marginBottom: '1em' }}>Log In:</h1>
				<Form >
					{
						this.state.usernameExist === null ?
							(<FormGroup>
								<Label for="username">Username</Label>
								<Input value={this.state.username} onChange={
									(e) => { this.changeUserName(e.target.value) }
								} />
							</FormGroup>) :
							this.state.usernameExist === true ?
								(<FormGroup>
									<Label for="username">Username</Label>
									<Input valid value={this.state.username} onChange={
										(e) => { this.changeUserName(e.target.value) }
									} />
									<FormFeedback></FormFeedback>
								</FormGroup>) :
								(<FormGroup>
									<Label for="username">Username</Label>
									<Input invalid value={this.state.username} onChange={
										(e) => { this.changeUserName(e.target.value) }
									} />
									<FormFeedback valid>Oh noes! that name doesn't exist!</FormFeedback>
								</FormGroup>)
					}
					{
						this.state.correctPassword === null ?
							(<FormGroup>
								<Label for="password">Password</Label>
								<Input value={this.state.password} onChange={
									(e) => { this.changePassword(e.target.value) }
								} />
							</FormGroup>) :
							this.state.correctPassword === true ?
								(<FormGroup>
									<Label for="password">Password</Label>
									<Input value={this.state.password} valid onChange={
										(e) => { this.changePassword(e.target.value) }
									} />
									<FormFeedback></FormFeedback>
								</FormGroup>) :
								(<FormGroup>
									<Label for="password">Password</Label>
									<Input value={this.state.password} invalid onChange={
										(e) => { this.changePassword(e.target.value) }
									} />
									<FormFeedback invalid>Wrong Password!</FormFeedback>
								</FormGroup>)
					}
				</Form>
				<Button onClick={() => { this.submitForm() }}>LOG IN</Button>
			</div>
		);
	}
}

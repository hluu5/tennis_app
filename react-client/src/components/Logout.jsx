
const axios = require('axios');

import React from 'react';
// import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button } from 'reactstrap';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// let backgroundImage = "https://www.northamptonma.gov/ImageRepository/Document?documentID=9915";

export default class Logout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount() {
		axios.post('/logout').then(data=>{
			console.log(data)
			this.props.checkLogin(false, false)
		})
		.catch(err=>console.log(err))
	}

	render() {
		return (
			<div style={{ position:'absolute', right:'0',left:'0', margin: 'auto',
				}}>
				<h1 style={{margin: '2em'}}>You have successfully logged out!</h1>
			</div>
		);
	}
}

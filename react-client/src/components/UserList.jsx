import React from 'react';
import axios from 'axios';
import { Media, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Navbar } from 'reactstrap';
// const faker = require('faker');
// const randomImage = faker.image.avatar;

class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			desiredLevel: null,
			dropDownNTRP: false,
			dropDownStrengths: false,
			username: null,
			list: [],
			link: null,
			strengths: [],
		}
		this.toggleNTRP = this.toggleNTRP.bind(this);
		this.toggleStrengths = this.toggleStrengths.bind(this);
	}

	getUserList() {
		axios.post('/usersList', { ntrp: this.state.desiredLevel , strengths: this.state.strengths }).then((data) => {
			console.log(data);
			this.setState({
				list: data.data
			})
			console.log(this.state.list)
		}).catch(err => console.log(err))
	}

	async setDesiredLevel(level) {
		await this.setState({
			desiredLevel: level
		})
		await this.getUserList();
		await console.log(this.state.list)
	}

	async setDesiredStrengths(e) {
		if (this.state.strengths.indexOf(e) < 0) {
			let newStrengthsState = this.state.strengths.concat(e);
			await this.setState(prevState => ({
				strengths: newStrengthsState.sort()
			}))
			await console.log(this.state.strengths)
		}
		await this.getUserList();

	}

	toggleNTRP() {
		this.setState({
			dropDownNTRP: !this.state.dropDownNTRP
		});
	}

	toggleStrengths() {
		this.setState({
			dropDownStrengths: !this.state.dropDownStrengths
		});
	}

	getUserName() {
		axios.get('/getUserName').then(data=>{
			// console.log('USERNAME', data)
			this.setState({
				username: data.data
			})
		}).catch(err=>console.log(err))
	}

	getMessagingService() {
		axios.get('/getMessagingLink').then(data=>{
			this.setState({
				link: data.data
			})
		})
	}

	componentDidMount() {
		this.getUserName();
		this.getMessagingService();
	}

	render() {
		return (
			<div style={{margin: '1.5em'}}>
				<h2 style={{margin: '1.5em', fontFamily: 'Gugi, cursive'}}>Welcome Back {this.state.username}!</h2>
				<div >
					<h3 style={{margin: '1.5em', fontFamily: 'Gugi, cursive'}}>Looking for a partner?</h3>
					<br />
					<Navbar color="faded" light>
						<UncontrolledDropdown style={{margin: '1.5em'}}>
							<ButtonDropdown isOpen={this.state.dropDownNTRP} toggle={this.toggleNTRP}>
								<DropdownToggle caret style={{fontFamily: 'Gugi, cursive'}}>
									Desired Level
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem onClick={() => { this.setDesiredLevel(3.0) }}>3.0</DropdownItem>
									<DropdownItem onClick={() => { this.setDesiredLevel(3.5) }}>3.5</DropdownItem>
									<DropdownItem onClick={() => { this.setDesiredLevel(4.0) }}>4.0</DropdownItem>
									<DropdownItem onClick={() => { this.setDesiredLevel(4.5) }}>4.5</DropdownItem>
									<DropdownItem onClick={() => { this.setDesiredLevel(5.0) }}>5.0</DropdownItem>
									<DropdownItem onClick={() => { this.setDesiredLevel(5.5) }}>5.5</DropdownItem>
									<DropdownItem onClick={() => { this.setDesiredLevel(6.0) }}>6.0</DropdownItem>
								</DropdownMenu>
							</ButtonDropdown>
						</UncontrolledDropdown>
						<UncontrolledDropdown style={{margin: '1.5em' }}>
							<ButtonDropdown isOpen={this.state.dropDownStrengths} toggle={this.toggleStrengths}>
								<DropdownToggle caret style={{fontFamily: 'Gugi, cursive'}}>
									Desired Strengths
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem key={1} onClick={() => { this.setDesiredStrengths("Strong Backhand") }}>Strong Backhand</DropdownItem>
									<DropdownItem key={2} onClick={() => { this.setDesiredStrengths("Big Serve") }}>Big Serve</DropdownItem>
									<DropdownItem key={3} onClick={() => { this.setDesiredStrengths("Strong Forehand") }}>Strong Forehand</DropdownItem>
									<DropdownItem key={4} onClick={() => { this.setDesiredStrengths("Net Player") }}>Net Player</DropdownItem>
									<DropdownItem key={5} onClick={() => { this.setDesiredStrengths("Grinder") }}>Grinder</DropdownItem>
									<DropdownItem key={6} onClick={() => { this.setDesiredStrengths("All-court Player") }}>All-court Player</DropdownItem>
									<DropdownItem key={7} onClick={() => { this.setDesiredStrengths("Flat Hitter") }}>Flat Hitter</DropdownItem>
									<DropdownItem key={8} onClick={() => { this.setDesiredStrengths("Topspin Hitter") }}>Topspin Hitter</DropdownItem>
								</DropdownMenu>
							</ButtonDropdown>
						</UncontrolledDropdown>
					</Navbar>

						<div style={{fontFamily: 'Gugi, cursive'}}>Desired Level: {this.state.desiredLevel}</div>
						<div style={{fontFamily: 'Gugi, cursive'}}>Desired Strengths: {
							this.state.strengths.map(e=>{return (<span key={e}>{e + ", "}</span>)})
						}</div>

				</div>
				<br/>
				{this.state.list.length === 0
					? (<div></div>)
			    : this.state.list.map(e=> {
						return (
							<div
								style={{  borderTop: '0.05em solid #e8eaed', borderBottom: '0.05em solid #e8eaed', paddingTop: '1em', paddingBottom: '1em'}}
								key={e.username}
								onClick={()=>{window.location = this.state.link}}
								>
                <img src={e.userThumbnail} style={{borderRadius: '50%',
        					height: '2em',
        					width: '2em',
        					display: 'inline'}} />
                <div style={{display: 'inline', padding:'1em', fontWeight: 'bold'}}>Username: {e.username}</div>
                <div style={{display: 'inline', padding:'1em'}}>First Name: {e.firstName}</div>
                <div style={{display: 'inline', padding:'1em'}}>Last Name: {e.lastName}</div>
                <div style={{display: 'inline', padding:'1em'}}>City: {e.city}</div>
                <div style={{display: 'inline', padding:'1em'}}>Ntrp: {e.ntrp}</div>
            	</div>
						)
					})
				}
			</div>
				)
			}
}

export default UserList;
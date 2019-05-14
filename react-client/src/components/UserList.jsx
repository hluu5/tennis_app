import React from 'react';
import axios from 'axios';
import {
	Media, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
	UncontrolledDropdown, Navbar, InputGroup, InputGroupText, InputGroupAddon,
	Input, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
// const faker = require('faker');
// const randomImage = faker.image.avatar;
import Map from './Map.jsx';

class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			desiredLevel: null,
			dropDownNTRP: false,
			dropDownStrengths: false,
			username: null,
			currentZipcode: null,
			currentLocation: [],
			otherUsersLocations: [],
			list: [],
			link: null,
			strengths: [],
			page: 1
		}
		this.toggleNTRP = this.toggleNTRP.bind(this);
		this.toggleStrengths = this.toggleStrengths.bind(this);
		this.getUserLocation = this.getUserLocation.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.getOtherUsersLocations = this.getOtherUsersLocations.bind(this);
	}

	getOtherUsersLocations(state) {
		this.state.list.map(function (e) {
			console.log(state.state);
			axios.post('/location', { zipcode: e.zipcode }).then((data) => {
				console.log(state.state)
				var newState = state.state.otherUsersLocations.concat(data.data);
				state.setState({
					otherUsersLocations: newState
				})
			})
				.then(() => {
					console.log("Get Other Location", state.state.otherUsersLocations)
				})
				.catch(err => { console.log(err) })
		})
	}

	getUserList() {
		axios.post('/usersList', { ntrp: this.state.desiredLevel, strengths: this.state.strengths }).then((data) => {
			// console.log(data);
			this.setState({
				list: data.data
			})
		})
			.then(() => {
				this.getOtherUsersLocations(this);
				// console.log(this.state.list)
			}).catch(err => console.log(err))
	}

	async setDesiredLevel(level) {
		await this.setState({
			desiredLevel: level
		})
		await this.getUserList();
		// await console.log(this.state.list)
	}

	async setDesiredStrengths(e) {
		if (this.state.strengths.indexOf(e) < 0) {
			let newStrengthsState = this.state.strengths.concat(e);
			await this.setState(prevState => ({
				strengths: newStrengthsState.sort()
			}))
			// await console.log(this.state.strengths)
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
		axios.get('/getUserName').then(data => {
			// console.log('USERNAME', data)
			this.setState({
				username: data.data
			})
		}).catch(err => console.log(err))
	}

	getMessagingService() {
		axios.get('/getMessagingLink').then(data => {
			this.setState({
				link: data.data
			})
		})
	}

	changeZipcode(e) {
		this.setState({
			currentZipcode: e
		})
	}

	getUserLocation() {
		axios.post('/location', { zipcode: this.state.currentZipcode })
			.then(data => {
				let newCurrentLocation = [];
				for (let i in data.data) {
					newCurrentLocation.push(data.data[i]);
				}
				this.setState({
					currentLocation: newCurrentLocation
				})
				console.log('inside UserList', this.state.currentLocation)
			})
			.catch(err => console.log(err))
	}


	handleKeyPress(e) {
		if (e.key === 'Enter') {
			this.getUserLocation();
		}
	}

	async nextPage() {
		await this.setState({
			otherUsersLocations: [],
			page: this.state.page + 1
		})
		await axios.post('/setNextPaginationPage', {page: this.state.page})
		.then(()=>{
			this.getUserList()
		})
		.catch(err=>console.log(err))
	}

	async prevPage() {
		await this.setState({
			otherUsersLocations: [],
			page: this.state.page === 1 ? 1 : this.state.page - 1
		})
		await axios.post('/setPrevPaginationPage', {page: this.state.page})
		.then(()=>{
			this.getUserList()
		})
		.catch(err=>console.log(err))
	}

	componentDidMount() {
		this.getUserName();
		this.getMessagingService();
	}



	render() {
		return (
			<div style={{ margin: '1.5em' }}>
				<h2 style={{ margin: '1.5em', fontFamily: 'Gugi, cursive' }}>Welcome Back {this.state.username}!</h2>
				<div >
					<h3 style={{ margin: '1.5em', fontFamily: 'Gugi, cursive' }}>Looking for a partner?</h3>
					<br />
					<Navbar color="faded" light>
						<UncontrolledDropdown style={{ margin: '1.5em' }}>
							<ButtonDropdown isOpen={this.state.dropDownNTRP} toggle={this.toggleNTRP}>
								<DropdownToggle caret style={{ fontFamily: 'Gugi, cursive' }}>
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
						<UncontrolledDropdown style={{ margin: '1.5em' }}>
							<ButtonDropdown isOpen={this.state.dropDownStrengths} toggle={this.toggleStrengths}>
								<DropdownToggle caret style={{ fontFamily: 'Gugi, cursive' }}>
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
					<InputGroup style={{ margin: '0.8em' }}>
						<InputGroupAddon addonType="prepend">
							<InputGroupText>Zipcode: </InputGroupText>
						</InputGroupAddon>
						<Input onChange={(e) => { this.changeZipcode(e.target.value) }}
							value={this.state.currentZipcode || ''}
							onKeyPress={(e) => { this.handleKeyPress(e) }} />
					</InputGroup>
					<div style={{ fontFamily: 'Gugi, cursive', margin: '0.8em' }}>Desired Level: {this.state.desiredLevel}</div>
					<div style={{ fontFamily: 'Gugi, cursive', margin: '0.8em' }}>Desired Strengths: {
						this.state.strengths.map(e => { return (<span key={e}>{e + ", "}</span>) })
					}</div>

				</div>
				<br />
				<Map currentLocation={this.state.currentLocation} otherUsersLocations={this.state.otherUsersLocations} usersList={this.state.list} />

				<Pagination aria-label="Page navigation example">
					<PaginationItem>
						<PaginationLink previous onClick={()=>{this.prevPage()}}/>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink next onClick={()=>{this.nextPage()}}/>
					</PaginationItem>
				</Pagination>

				{this.state.list.length === 0
					? (<div></div>)
					: (<div style={{ marginBotton: '3em' }}>
						{this.state.list.map(e => {
							return (
								<div
									style={{ borderTop: '0.05em solid #e8eaed', borderBottom: '0.05em solid #e8eaed', paddingTop: '1em', paddingBottom: '1em' }}
									key={e.username}
									onClick={() => { window.location = this.state.link }}
								>
									<img src={e.userThumbnail} style={{
										borderRadius: '50%',
										height: '2em',
										width: '2em',
										display: 'inline'
									}} />
									<div style={{ display: 'inline', padding: '1em' }}><strong>Username: </strong>{e.username}</div>
									<div style={{ display: 'inline', padding: '1em' }}><strong>Name: </strong>{e.firstName + " " + e.lastName}</div>
									<div style={{ display: 'inline', padding: '1em' }}><strong>City: </strong>{e.city}</div>
									<div style={{ display: 'inline', padding: '1em' }}><strong>Ntrp: </strong>{e.ntrp}</div>
									<div style={{ display: 'inline', padding: '1em' }}><strong>Strengths: </strong>{
										e.strengths.map((str) => {
											return (<span key={str}>{str + ", "}</span>)
										})
									}</div>
								</div>
							)
						})
						}
					</div>)}
			</div>
		)
	}
}

export default UserList;
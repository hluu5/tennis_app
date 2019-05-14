// import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import React from 'react';
import axios from 'axios';
const key = require('../../../env.js').key;

const L = require('leaflet');

export default class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userLocation: null,
			usersLocations: null,
		}
	}

	// getUserLocation() {
	// 	axios.post('/location', {zipcode: this.props.zipcode})
	// 	.then(data=>{console.log(data)})
	// 	.catch(err=>console.log(err))
	// }
	setUsersLocations() {
		this.setState({
			usersLocations: this.props.otherUsersLocations
		})
		this.addMarker();
	}

	addMarker() {
		// if(this.props.otherUsersLocations.length === 0) {
		// 	L.marker([this.state.userLocation[0],this.state.userLocation[1]])
		// 		.bindPopup(`${this.props.list[i].firstName} ${this.props.list[i].lastName}`)
		// 		.addTo(map);
		// } else {"
			console.log("addMarker, this.props.otherUserLocation",this.props.otherUsersLocations)
			if(this.props.otherUsersLocations.length === 0) {
				console.log("state is empty");
				return;
			} else {
				this.props.otherUsersLocations.map((e,i)=>{
					let location = [e.lat, e.lng];
					L.marker(location)
						.bindPopup(`${this.props.list[i].firstName} ${this.props.list[i].lastName}`)
						.addTo(map);
					console.log('location of props', location);
				})
			}
		// }
	}

	initMap(userlocation, userslocations) {
		document.getElementById('weathermap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
		var map = L.map('map');
		map.setView(userlocation || [47.70, 13.35], 12 );
		var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		if (userslocations===null || userslocations === undefined) {
			console.log("no marker added");
		} else {
			console.log('Userlocation', userslocations)
			for (let loc = 0; loc < userslocations.length; loc ++){
				let location = new Promise((resolve,reject)=>{
					let latlong = resolve([userslocations[loc].lat, userslocations[loc].lng]);
				}).then(data=>{
					console.log(data)
					L.marker(data)
								.bindPopup(`<p>${this.props.usersList[loc].firstName} ${this.props.usersList[loc].lastName}
								<br />${this.props.usersList[loc].city}</p>`)
								.addTo(map);

				}).catch(err=>console.log(err))
				console.log(location)
			}
		}
	}

	componentDidMount(){
		// Initialize the map
		this.initMap(this.state.userLocation, this.state.usersLocations);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps, this.props.currentLocation)
		if(prevProps.currentLocation !== this.props.currentLocation) {
			this.setState({
				userLocation: this.props.currentLocation
			})
		}
		if (prevProps.otherUsersLocations !== this.props.otherUsersLocations) {
			// this.setUsersLocations();
			this.setState({
				usersLocations: this.props.otherUsersLocations
			})
		}
		this.initMap(this.state.userLocation, this.state.usersLocations);
		console.log(this.state.userLocation);
	}


	render() {
		return (
			<div id="weathermap" style={{
				width: "500px",
				height: "300px",
				marginBottom:'2em'
			}}></div>
		)
	}
}




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
		}
	}

	// getUserLocation() {
	// 	axios.post('/location', {zipcode: this.props.zipcode})
	// 	.then(data=>{console.log(data)})
	// 	.catch(err=>console.log(err))
	// }

	changeMapLocation() {

	}

	initMap(location) {
		document.getElementById('weathermap').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";
		var map = L.map('map');
		map.setView(location || [47.70, 13.35], 12 );
		var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
		// 33.8186385, -117.8282121
		// // for (var i = 0; i <= 10; i++) {
		// 	let lat = 31.81+i;
		// 	let long = -117.81;
			L.marker([33.77,-117.93])
				.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
				.addTo(map);
			L.marker([33.83,-117.91])
				.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
				.addTo(map);
			L.marker([33.81,-117.81])
				.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
				.addTo(map);
	}

	componentDidMount(){
		// Initialize the map
		this.initMap(this.state.userLocation);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log(prevProps, this.props.currentLocation)
		if(prevProps.currentLocation !== this.props.currentLocation) {
			this.setState({
				userLocation: this.props.currentLocation
			})
		}
		this.initMap(this.state.userLocation);
		console.log(this.state.userLocation);
	}


	render() {
		return (
			<div id="weathermap" style={{
				width: "500px",
				height: "300px"
			}}></div>
		)
	}
}




import React from 'react';
import ReactDOM from 'react-dom';
import WelcomePage from './components/WelcomePage.jsx';
import SignupPage from './components/SignupPage.jsx';
import Messaging from './components/Messaging.jsx';
import Login from './components/Login.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import Popper from 'popper.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.checkLogin = this.checkLogin.bind(this);
  }

  checkLogin(userState, passwordState) {
        console.log(userState, passwordState)
        if (userState === true && passwordState === true) {
          this.setState({
            isLoggedIn: true
          })
        } else {
          this.setState({
            isLoggedIn: false
          })
        }
    }


  componentDidMount() {
    axios.get('/isLoggedIn').then(data => {
      console.log(data);
      if (data.data === 'true') {
        this.setState({
          isLoggedIn: true
        })
      }
    })
  }

  render() {
    return (
      // <Router>
      <div>
        {/* <h1>Item List</h1> */}
        <WelcomePage item={this.state.items} />
        {/* <SignupPage /> */}
        {this.state.isLoggedIn === true ? (<Messaging />) : (<Login checkLogin={this.checkLogin} />)}
        {/* <Login checkLogin={this.checkLogin}/> */}
        {/* <Route path="/check" exact component={Messaging} />} */}
      </div>
      // </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('WelcomeAndLogin'));
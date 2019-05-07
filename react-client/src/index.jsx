import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WelcomePage from './components/WelcomePage.jsx';
import SignupPage from './components/SignupPage.jsx';
import Login from './components/Login.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import Popper from 'popper.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['name']
    }
  }

  render () {
    return (<div>
      {/* <h1>Item List</h1> */}
      <WelcomePage item={this.state.items}/>
      {/* <SignupPage /> */}
      <Login />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
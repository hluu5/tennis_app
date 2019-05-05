import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import List from './components/List.jsx';
import WelcomePage from './components/WelcomePage.jsx';
import Authentication from './components/Authentication.jsx';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
// import $ from 'jquery';
import Popper from 'popper.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: ['name']
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render () {
    return (<div>
      {/* <h1>Item List</h1> */}
      <WelcomePage item={this.state.items}/>
      <Authentication />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
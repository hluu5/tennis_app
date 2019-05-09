import React from 'react';
import ReactDOM from 'react-dom';
import WelcomePage from './components/WelcomePage.jsx';
import SignupPage from './components/SignupPage.jsx';
import UserList from './components/UserList.jsx';
import Login from './components/Login.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import Popper from 'popper.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';

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
      <Router>
        <div>
          <Navbar style={{ backgroundColor: 'rgb(2,4,1)', padding:'2em'}} dark expand="md" sticky="top">
            <img src="https://cdn4.eyeem.com/thumb/cb72e94d0db277b7a5f515683acd5a77e3490f6a-1526396544556/w/700" style={{
              maxHeight: '4em', maxWidth: "4em", marginRight: "2em", marginTop: '0', marginBottom: '0',
              borderRadius: '30%'
            }} />
            <NavbarBrand style={{ fontFamily: 'Gugi, cursive' , color:'white'}}>LET'S HIT!</NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem style={{marginLeft:'2em', marginRight:'2em'}}>
                <Button style={{ fontFamily: 'Gugi, cursive' , color:'white'}}>
                    <Link to='/find' style={{ textDecoration: 'none' , color: 'white' }}>Find</Link>
                </Button>
              </NavItem>
              <NavItem>
                <Button style={{ fontFamily: 'Gugi, cursive' , color:'white', marginRight:'1.5em'}}>
                  <Link to='/join' style={{ textDecoration: 'none' , color: 'white' }}>Join</Link>
                </Button>
              </NavItem>
              <NavItem>
                <Button style={{ fontFamily: 'Gugi, cursive' , color:'white', marginRight:'1.5em'}}>
                  <Link to='/login' style={{ textDecoration: 'none', color: 'white'}}>Login</Link>
                </Button>
              </NavItem>
            </Nav>
          </Navbar>

          <Route exact path="/" render={()=>(<img src="https://www.northamptonma.gov/ImageRepository/Document?documentID=9915"/>)} />
          <Route path="/join" component={SignupPage} />
          <Route
            path="/login"
            render={(props) => {
              if(this.state.isLoggedIn === true) {
                return (<UserList />)
              } else {
                return (<Login {...props} checkLogin={this.checkLogin} />)
              }
            }}
          />
          <Route
            path="/find"
            render={(props) => {
              if(this.state.isLoggedIn === true) {
                return (<UserList />)
              } else {
                return (<Login {...props} checkLogin={this.checkLogin} />)
              }
            }}/>
        </div>
      </Router>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('WelcomeAndLogin'));
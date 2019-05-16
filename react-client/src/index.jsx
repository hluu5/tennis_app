import React from 'react';
import ReactDOM from 'react-dom';
import SignupPage from './components/SignupPage.jsx';
import UserList from './components/UserList.jsx';
import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';
import Popper from 'popper.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button, Jumbotron, Container} from 'reactstrap';

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
                  <Link to='/logout' style={{ textDecoration: 'none', color: 'white'}}>Logout</Link>
                </Button>
              </NavItem>
            </Nav>
          </Navbar>

            <Route exact path="/" render={()=>(
              <div>
                <div className='inner'>
                  <h1 className="display-3" style={{fontWeight:'bolder', color: '#000000'}}>Tennis Lovers' Ultimate Tool</h1>
                  <p className="lead" style={{color: 'white' ,fontWeight:'bold'}}>
                  Let's hit connects tennis lovers all around the world. It's a quick and easy way to connect to tennis players in an area.
                  Comes with skills and area search, Let's Hit is the ultimate app for your tennis need.</p>

                  <Button style={{ position:'inline-block', height:'4em', width:'15em',
                    marginRight:'1em', opacity: '0.7', borderStyle:'solid', borderWidth:'0.25em',
                    fontFamily: 'Gugi, cursive' , color:'#000000', borderColor: '#31c7df'
                    }} color="info">
                    <Link to='/find' style={{ textDecoration: 'none' , color: '#000000' }}>Let's Hit!</Link></Button>
                  <Button style={{ position:'inline-block', height:'4em', width:'15em',  opacity: '0.7',
                    borderStyle:'solid', borderWidth:'0.25em',fontFamily: 'Gugi, cursive' , color:'#000000',
                    borderColor: '#31c7df'
                    }} color="info"><Link to='/login' style={{ textDecoration: 'none', color: '#000000'}}>Login</Link></Button>
                </div>
                <img className="outer" src="https://www.northamptonma.gov/ImageRepository/Document?documentID=9915"/>
              </div>
              )}
            />

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
          <Route
            path="/logout"
            render={(props) => {
              return (<Logout {...props} checkLogin={this.checkLogin}/>)
            }}/>
        </div>
      </Router>

    )
  }
}

ReactDOM.render(<App />, document.getElementById('WelcomeAndLogin'));
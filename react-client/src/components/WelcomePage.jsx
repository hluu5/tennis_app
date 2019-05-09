import React from 'react';
import $ from 'jquery';
import Popper from 'popper.js';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,Button
} from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



export default class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
                <NavLink href="/components/" style={{ fontFamily: 'Gugi, cursive' , color:'white'}}>Find</NavLink>
              </NavItem>
              <NavItem>
                {/* <NavLink href="https://github.com/reactstrap/reactstrap" style={{ fontFamily: 'Gugi, cursive' , color:'white'}}>Join</NavLink> */}
                <Button href="/join" style={{ fontFamily: 'Gugi, cursive' , color:'white'}}>
                  <Link to='/join' >Join</Link>
                </Button>
              </NavItem>
            </Nav>
          </Navbar>

          {/* <img src="https://www.northamptonma.gov/ImageRepository/Document?documentID=9915"/> */}
        </div>
      </Router>
    );
  }
}
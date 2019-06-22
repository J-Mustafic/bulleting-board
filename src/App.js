import React, { Component } from 'react';
import LogoImage from './images/post-it.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class App extends Component {

    render() {
        return (
            <div className="container-flex">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img className="nav-logo" src={LogoImage} alt="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#boards">Boards</Nav.Link>
                            <NavDropdown title="Notes" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="">Add note</NavDropdown.Item>
                                <NavDropdown.Item href="">Sort notes</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="">Divide board</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#profile">Profile</Nav.Link>
                            <Nav.Link href="#logout">Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
export default App;
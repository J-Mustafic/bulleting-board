import React, { Component } from 'react';
import LogoImage from './images/post-it.png';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Board from './Board';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class App extends Component {

    render() {
        return (
            <div className="container-flex">
                <Router>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#home">
                            <img className="nav-logo" src={LogoImage} alt="logo" />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href=""><Link to="/boards">Boards</Link></Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#profile">Profile</Nav.Link>
                                <Nav.Link href="#logout">Log out</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Route exact path="/boards" component={Board} />
                </Router>
            </div>
        )
    }
}
export default App;
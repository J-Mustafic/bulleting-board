import React, { Component } from 'react';
import Note from './Note';
import { FaPlusCircle } from 'react-icons/fa';
import config from './config';
import Firebase from 'firebase';
import LogoImage from './images/post-it.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class Board extends Component {

    constructor(props) {
        super(props);
        if (!Firebase.apps.length) {
            Firebase.initializeApp(config);
        }
        this.state = {
            notes: []
        };
        this.eachNote = this.eachNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.generateId = this.generateId.bind(this);
    }

    componentDidMount() {
        this.getUserData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
            this.writeUserData();
        }
    }

    writeUserData = () => {
        Firebase.database().ref('/').set(this.state);
    }

    getUserData = () => {
        let ref = Firebase.database().ref('/');
        ref.on('value', snapshot => {
            const state = snapshot.val();
            this.setState(state);
        });
    }

    addNote(text) {
        this.setState(prevState => ({
            notes: [
                ...prevState.notes,
                {
                    id: this.generateId(),
                    note: text
                }
            ]
        }))
    }

    generateId() {
        var lastElementIndex = this.state.notes.length - 1;
        var uniqueId = this.state.notes[lastElementIndex] ? this.state.notes[lastElementIndex].id : 0;
        return ++uniqueId;
    }

    update(newText, i) {
        this.setState(prevState => ({
            notes: prevState.notes.map(
                note => (note.id !== i) ? note : { ...note, note: newText }
            )
        }));
    }

    remove(id) {
        this.setState(prevState => ({
            notes: prevState.notes.filter(note => note.id !== id)
        }))
    }

    eachNote(note, i) {
        return <Note
            key={note.id}
            index={note.id}
            onChange={this.update}
            onRemove={this.remove}>
            {note.note}
        </Note>

    }

    render() {
        return (
            <div>
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
                                <NavDropdown.Item href="" onClick={this.addNote.bind(this, "New note!")}>Add note</NavDropdown.Item>
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
                <div className="board">
                    <p id="add" onClick={this.addNote.bind(this, "New note!")}><FaPlusCircle /></p>
                    {this.state.notes.map(this.eachNote)}
                </div>
            </div>

        )
    }

}

export default Board;
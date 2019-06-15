import React, { Component } from 'react';
import Note from './Note';
import { FaPlus } from 'react-icons/fa';

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
        this.eachNote = this.eachNote.bind(this);
        this.addNote = this.addNote.bind(this);
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.generateId = this.generateId.bind(this);
    }

    componentWillMount() {

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
        this._uniqueId = this._uniqueId || 0;
        return this._uniqueId++;
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
            <div className="board">
                <button id="add" className="button" onClick={this.addNote.bind(this, "New note!")}>Add new <FaPlus /></button>
                {this.state.notes.map(this.eachNote)}
            </div>
        )
    }

}

export default Board;
import React, { Component } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';


class Note extends Component {

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.editNoteText = this.editNoteText.bind(this);
        this.state = {
            editing: false,
            text: props.children
        }
    }

    render() {
        if (this.state.editing)
            return this.renderForm();
        else
            return this.renderDisplay();

    }

    renderDisplay() {
        return (
            <div className="note">
                <p onClick={this.edit}>{this.state.text}</p>
                <span>
                    <button id="edit" onClick={this.edit}><FaPencilAlt /></button>
                    <button id="remove" onClick={this.remove}><FaTrash /></button>
                </span>
            </div>
        )
    }

    edit() {
        this.setState({
            editing: true
        })
    }

    remove() {
        alert('remove')
    }

    saveEdit() {
        this.setState({
            editing: false
        })
    }

    editNoteText() {
        var textArea = document.getElementById('note-text-edit');
        this.setState({
            text: textArea.value
        })
    }

    renderForm() {
        return (
            <div className="note">
                <form>
                    <textarea id="note-text-edit" onChange={this.editNoteText} value={this.state.text} />
                    <button onClick={this.saveEdit}><FaSave /></button>
                </form>
            </div>
        )
    }

}

export default Note;
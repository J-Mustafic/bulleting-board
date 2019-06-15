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
        this.startDrag = this.startDrag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.state = {
            editing: false
        };
    }

    render() {
        if (this.state.editing)
            return this.renderForm();
        else
            return this.renderDisplay();
    }

    renderDisplay() {
        return (
            <div className="note" onMouseDown={this.startDrag} onMouseUp={this.stopDrag} onMouseMove={this.drag}>
                <p onMouseUp={this.edit}>{this.props.children}</p>
                <span>
                    <button id="edit" onClick={this.edit}><FaPencilAlt /></button>
                    <button id="remove" onClick={this.remove}><FaTrash /></button>
                </span>
            </div>
        );
    }

    startDrag(e) {
        e.preventDefault();
        this.setState({
            dragging: true
        })
    }

    stopDrag() {
        this.setState({
            dragging: false
        })
    }

    drag(e) {
        if (!this.state.dragging) return;
        var note = e.target;
        var event = window.event;
        var mouseX = event.clientX;
        var mouseY = event.clientY;
        var offsetX = mouseX;
        var offsetY = mouseY;
        note.style.left = (mouseX - 20) + 'px';
        note.style.top = (mouseY - 20) + 'px';
    }

    edit() {
        this.setState({
            editing: true
        });
    }

    remove(e) {
        e.preventDefault();
        this.props.onRemove(this.props.index);
    }

    saveEdit(e) {
        e.preventDefault();
        this.props.onChange(this._newText.value, this.props.index);
        this.setState({
            editing: false
        });
    }

    renderForm() {
        return (
            <div className="note">
                <form onSubmit={this.saveEdit}>
                    <input id="note-text-edit"
                        ref={input => this._newText = input}
                        defaultValue={this.props.children} />
                    <button id="save"><FaSave /></button>
                </form>
            </div>
        )
    }

}

export default Note;
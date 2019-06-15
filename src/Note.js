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
        this.randomBetween = this.randomBetween.bind(this);
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
            <div className="note" onMouseDown={this.startDrag} onMouseUp={this.stopDrag} style={this.style}>
                <p onMouseUp={this.edit}>{this.props.children}</p>
                <span>
                    <button id="edit" onClick={this.edit}><FaPencilAlt /></button>
                    <button id="remove" onClick={this.remove}><FaTrash /></button>
                </span>
            </div>
        );
    }

    componentWillMount() {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150, 'px'),
            top: this.randomBetween(0, window.innerHeight - 150, 'px'),
            transform: `rotate(${this.randomBetween(-15, 15, 'deg')})`
        }
    }

    componentDidUpdate() {
        var textArea;
        if (this.state.editing) {
            textArea = this._newText;
            textArea.focus();
            textArea.select();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.children !== nextProps.children ||
            this.state !== nextState
        )
    }

    randomBetween(x, y, s) {
        return x + Math.ceil(Math.random() * (y - x)) + s;
    }

    startDrag(e) {
        e.preventDefault();
        this.setState({
            dragging: true
        })
        this._mouseX = e.clientX;
        this._mouseY = e.clientY;
        this._target = e.target;
        document.onmousemove = this.drag;
    }

    stopDrag() {
        this.setState({
            dragging: false
        })
    }

    drag(e) {
        if (!this.state.dragging) return;
        var note = this._target;
        var pos1 = this._mouseX - e.clientX;
        var pos2 = this._mouseY - e.clientY;
        this._mouseX = e.clientX;
        this._mouseY = e.clientY;
        note.style.left = (note.offsetLeft - pos1) + 'px';
        note.style.top = (note.offsetTop - pos2) + 'px';
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
            <div className="note" style={this.style}>
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
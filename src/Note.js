import React, { Component } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import Draggable from 'react-draggable';
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
            <Draggable defaultPosition={this.position}>
                <div className="note">
                    <p onMouseUp={this.edit}>{this.props.children}</p>
                    <span>
                        <button id="edit" className="button" onClick={this.edit}><FaPencilAlt /></button>
                        <button id="remove" className="button" onClick={this.remove}><FaTrash /></button>
                    </span>
                </div>
            </Draggable>
        );
    }

    componentWillMount() {
        this.position = {
            x: this.randomBetween(200, window.innerWidth / 2 - 200),
            y: this.randomBetween(200, window.innerHeight - 400)
        }
    }

    componentDidUpdate() {
        var textArea;
        if (this.state.editing) {
            textArea = this._newText;
            textArea.focus();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.children !== nextProps.children ||
            this.state !== nextState
        )
    }

    randomBetween(x, y, s) {
        if (s)
            return x + Math.ceil(Math.random() * (y - x)) + s;
        else
            return x + Math.ceil(Math.random() * (y - x));
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
            <Draggable>
                <div className="note">
                    <form onSubmit={this.saveEdit}>
                        <input id="note-text-edit"
                            ref={input => this._newText = input}
                            defaultValue={this.props.children} />
                        <button className="button" id="save"><FaSave /></button>
                    </form>
                </div>
            </Draggable>
        )
    }

}

export default Note;
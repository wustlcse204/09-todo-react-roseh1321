import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
    render() {
        return (
            <form id="new-todo" onSubmit={this.props.addTodo}>
                <input id="newTitle" value={this.props.input} onChange={this.props.onChange} type="text" placeholder="New ToDo..."></input>
                <button id="new-submit">+</button>
            </form>
        );
    }
}

export default NewTodo;

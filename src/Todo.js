import React, { Component } from 'react';
import './Todo.css';
var apiKey = "7ea9861de96ddf543cb64cb61bc87730c06bf105b7245c2497bd467a6873dcb0";


class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: this.props.completed
        }
        this.checkTodo = this.checkTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    checkTodo(event) {
        var self=this;
        var todoId=this.props.id;
        var data = {
            completed: true
        };
        var completeRequest = new XMLHttpRequest();
        completeRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                self.setState({
                    completed:true
                })
            } else if (this.readyState === 4) {
                console.log(this.responseText);
            }
        }
        completeRequest.open("PUT", "https://api.kraigh.net/todos/" + todoId, true);
        completeRequest.setRequestHeader("Content-type", "application/json");
        completeRequest.setRequestHeader("x-api-key", apiKey);
        completeRequest.send(JSON.stringify(data));
        // Add "completed" class
    }

    deleteTodo(event) {
        console.log("trying to delete")
        this.props.removeDeletedTodo(this.props.id);
    }

    render() {
        let todo = "todo";
        if(this.state.completed) {
            todo = "todo completed"
        }
        return (
            <article id={this.props.id} className={todo}>
                <button className="check" onClick={this.checkTodo}></button>
                <p>{this.props.text}</p>
                <button className="delete" onClick={this.deleteTodo}>-</button>
            </article>
        );
    }
}

export default Todo;

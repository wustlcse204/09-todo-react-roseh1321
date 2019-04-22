import React, { Component } from 'react';
import './App.css';
import Todo from './Todo';
import NewTodo from './NewTodo';

var apiKey = "7ea9861de96ddf543cb64cb61bc87730c06bf105b7245c2497bd467a6873dcb0";


class App extends Component {

  constructor () {
    super();
    this.state = {todos: [], imput: ''};
    this.addTodo = this.addTodo.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeDeletedTodo = this.removeDeletedTodo.bind(this);
    this.sortAlpha = this.sortAlpha.bind(this);
    }

  onChange(event) {
    this.setState({
      input: event.target.value
    });
  }




  componentDidMount() {
      // Load existing ToDos
      var self=this;
      var listRequest = new XMLHttpRequest();
      listRequest.onreadystatechange = function() {
          if(this.readyState===4 && this.status===200) {
              var todos = JSON.parse(this.responseText);
              self.setState({todos: todos});
          } else if(this.readyState===4) {
              console.log(this.responseText);
          }
      }
      listRequest.open("GET", "https://api.kraigh.net/todos", true);
      listRequest.setRequestHeader("x-api-key", apiKey);
      listRequest.send();
  }

  addTodo(event) {
      event.preventDefault();
      var self=this;

      // Submit Todo to API
      var data = {
        text: self.state.input
      };

      var createRequest = new XMLHttpRequest();
      createRequest.onreadystatechange = function () {
        // Wait for readyState = 4 & 200 response
        if (this.readyState === 4 && this.status === 200) {
          self.setState({
            todos: [...self.state.todos, JSON.parse(this.responseText)]
          })
          self.setState({input: ''});

        } else if (this.readyState === 4) {

          // this.status !== 200, error from server
          console.log(this.responseText);

        }
      };

      createRequest.open("POST", "https://api.kraigh.net/todos", true);
      createRequest.setRequestHeader("Content-type", "application/json");
      createRequest.setRequestHeader("x-api-key", apiKey);
      createRequest.send(JSON.stringify(data));
  }

  removeDeletedTodo(id) {
    console.log("remove deleted function")
    var self=this;
    // API call, DELETE to remove
    var deleteRequest = new XMLHttpRequest();
    deleteRequest.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const remainingTodos = self.state.todos.filter((todo) => {
          if (todo.id !== id) {
            return todo;
          }
        });
        self.setState({todos: remainingTodos});
      }
      else if (this.readyState===4) {
        console.log(this.responseText);
      }
    }

    deleteRequest.open("DELETE", "https://api.kraigh.net/todos/" + id, true);
    console.log("fdsa");
    deleteRequest.setRequestHeader("Content-type", "application/json");
    deleteRequest.setRequestHeader("x-api-key", apiKey);
    deleteRequest.send();

}

deleteTodo(event) {
    console.log("trying to delete");
    this.props.removeDeletedTodo(this.props.id);
  }

sortAlpha () {
  const todos = this.state.todos;
  todos.sort(function (a, b) {
    return a.text.localeCompare(b.text);
  })
  this.setState({todos: todos});
}

  render() {
    return (
      <section id="todos">
        <button onClick={this.sortAlpha} className="sortBtn">Sort Alphabetically</button>
        <NewTodo addTodo={this.addTodo} onChange={this.onChange} input={this.state.input} />
        {this.state.todos.map((todo) =>
          <Todo key={todo.id} id={todo.id} completed={todo.completed}
            text={todo.text} removeDeletedTodo={this.removeDeletedTodo} />
        )}

      </section>
    );
  }




}

export default App;

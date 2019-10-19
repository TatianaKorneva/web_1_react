﻿// JavaScript source code
import React from 'react';
import './App.css';
import Todos from './components/Todos'
import AddTodo from "./components/addTodo";

class App_Todos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: 'Не пропустить солнечное затмение',
          completed: false,
		  DateOfTodo: '2026-08-12',
        },
        {
          id: 2,
          title: 'Увидеть закат в самолете',
          completed: true,
		  DateOfTodo: '2018-12-13',
        },
        {
          id: 3,
          title: 'Встретить новый год в другой стране',
          completed: false,
		  DateOfTodo: '2019-12-31',
        },
      ]
    };
	this.filterTodos = this.filterTodos.bind(this);
    this.displayedTodos = this.state;
    this.addTodo = this.addTodo.bind(this);
	this.filterText = React.createRef();
  }

  //Добавление дела
  addTodo = (title, date) => {
	this.state = { todos: [...this.state.todos, { 
	id: this.state.todos.length+1, 
	title: title,  
	completed: false,
	DateOfTodo: date,}]
	}	
	this.setState(this.state);
  };
  // Toggle complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }) });
  };
  delTodo = (id) => {
    this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]});
  }
  filterTodos(event) {
	this.setState({ todos: this.state.todos.filter(todo => todo.title.match(new RegExp(this.filterText.current.value, 'i')) != null) });
  }
  render() {
    return (
      <div className="App_Todos">
          <AddTodo addTodo={this.addTodo} />
		  <div className="row mb-2">
		  <label className="col-md-2">Фильтр по названию:</label>
            <form>
              <div className="col">
                <input type='text'
                  name='filterText'
                  placeholder='Введите здесь'
                  ref={this.filterText}
                  className='form-control'
                  onInput={this.filterTodos}
                />
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col">
              <Todos todos={this.state.todos}
                length={this.state.todos.length}
                markComplete={this.markComplete}
                delTodo={this.delTodo}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default App_Todos;
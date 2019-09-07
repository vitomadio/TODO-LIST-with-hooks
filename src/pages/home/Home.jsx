import React, { useState, useEffect, useContext, useRef } from 'react';
import { StoreContext } from '../../store';
import './Home.scss';

function Home() {
  const [state, dispatch] = useContext(StoreContext);
  const [title, setTitle] = useState();
  const inputEl = useRef(null);

  useEffect(() => {
    fetch('http://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => res.json())
      .then(response => {
        dispatch({
          type: 'getTodos',
          payload: response
        });
      });
  }, []);
  // Mark as done.
  const markAsDone = (todo) => {
    if (todo.completed === false) {
      // Check todo as completed.
      let newList = [];
      state.todoList.forEach(t => {
        if (t.id === todo.id) {
          t.completed = true;
        }
        newList.push(t);
      });
      dispatch({
        type: 'setTodos',
        payload: newList
      });
      // Change Todo status to true on server.
      fetch(`http://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          completed: true
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
    } else {
      // Uncheck Todo in the UI.
      let newList = [];
      state.todoList.forEach(t => {
        if (t.id === todo.id) {
          t.completed = false;
        }
        newList.push(t);
      });
      dispatch({
        type: 'setTodos',
        payload: newList
      });
      // Change Todo status to false on server.
      fetch(`http://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          completed: false
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
    }
  }

  // Add one todo to the list.
  const addNewTodo = () => {
    if (title) {
      // Add todo to the UI.
      dispatch({
        type: 'addTodo',
        payload: {
          id: Date.now(),
          title: title,
          userId: 2,
          completed: false
        }
      });
      // Add the new todo to the server.
      fetch(`http://jsonplaceholder.typicode.com/todos`, {
        method: 'POST',
        body: JSON.stringify({
          id: Date.now(),
          title: title,
          userId: 2,
          completed: false
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      // Clean the input after submit.
      inputEl.current.value = "";
    }
  } 

  // Delete Todo from the list after completed.
  const deleteTodo = (todo) => {
    if (todo.completed) {
      let result = confirm("Are you sure you want to remove this from the list?");
      if (result) {
        dispatch({
          type: 'removeTodo',
          payload: todo.id
        });

        fetch(`http://jsonplaceholder.typicode.com/todos/${todo.id}`, {
          method: 'DELETE',
        });
      }
    }
  }

  let todolist = null
  todolist =  state.todoList.map((todo, i) => {
    return (<li className="list-item" key={i}>
      <input type="checkbox" onChange={() => markAsDone(todo)} checked={todo.completed}/>
      <p className={todo.completed ? "done title" : "title"}>{todo.title}</p>
      <button className="btn"
      onClick={() => deleteTodo(todo)}
      >x</button>
    </li>)
  }); 

  return (
    <div className="wrapper">
      <div className="input-wrapper">
        <input type="text" className="input-todo" onChange={(e) => setTitle(e.target.value)} ref={inputEl} />
        <button className="btn-submit"
          onClick={() => addNewTodo()}
  >
    Submit New Todo
          </button>
      </div>
      <ul>
        {todolist}
      </ul>
    </div>
  )
}

export default Home;

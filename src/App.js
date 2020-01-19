import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm'
import { Grid, Button } from '@material-ui/core';

function App() {
  const [todos, setTodos] = useState([
    {id: 1, name: 'First Todo', description: 'Todo1 description', complete: false }, 
    {id: 2, name: 'Second Todo', description: 'Todo2 description', complete: true}])

  const [showOrHide, setShowOrHide] = useState(false) 
  const [gridTodo, setGridTodo] = useState(6) 
  const [gridCompleted, setGridCompleted] = useState(6) 

  const LOCAL_STORAGE_KEY = 'todoApp.todos'

  const defaultGridWidth = 6;

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    handleGridWidth()
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleGridWidth() {
    const completed = todos.filter(todo => todo.complete).length
    const toBeDone = todos.filter(todo => !todo.complete).length
    let diff = completed - toBeDone;
    if (diff > 3) {
      diff = 3;
    } else if (diff < -3) {
      diff = -3
    }

    if (diff === 0) {
      setGridTodo(defaultGridWidth)
      setGridCompleted(defaultGridWidth)
    } else {
      setGridTodo(defaultGridWidth - diff)
      setGridCompleted(defaultGridWidth + diff)
    }
  }

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  } 

  function openForm() {
    setShowOrHide(true)
  }

  function closeForm() {
    setShowOrHide(false)
  }

  function clearTodos() {
    const newTodos = todos.filter(todo => ! todo.complete)
    setTodos(newTodos)
  }

  function addTodo(todo) {
    setTodos([...todos, todo])
  }

  return (
    <div className="page">
      <Grid 
        container
        item
        xs={11}
        md={4}
        className="container">

        <Grid
          container
          className="header"
          direction="row"
          justify="space-between"
          alignItems="center">
            <div className="title">Todo App</div>
            <div className="actions">
              <Button variant="contained" onClick={openForm} className="primaryBtn">Add Todo</Button>
            </div>
        </Grid>

        <Grid
          container>
          <Grid item={true} xs={gridTodo}>
            <div className="result-box todo-result">
              <span className="result-value">{todos.filter(todo => !todo.complete).length}</span>
              <span className="result-label">To be done</span>
            </div>
          </Grid>
          <Grid item={true} xs={gridCompleted}>
            <div className="result-box completed-result">
              <span className="result-value">{todos.filter(todo => todo.complete).length}</span>
              <span className="result-label">Completed</span>
            </div>
          </Grid>
        </Grid>

        <TodoList todos={todos} toggleTodo={toggleTodo}/>

        <Grid
          container
          className="footer"
          direction="row"
          justify="flex-end"
          alignItems="center">
            <label className="clear-completed-label" onClick={clearTodos}>Clear Completed Todos</label>
        </Grid>

        <TodoForm showOrHide={showOrHide} closeForm={closeForm} addTodo={addTodo} />

      </Grid>
    </div>
  );
}

export default App;

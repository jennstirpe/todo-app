import { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { lightTheme, darkTheme } from './themes.js';
import GlobalStyles from "./components/styled/Global";
import Banner from './components/Banner.js';
import Header from './components/Header';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoFilters from './components/TodoFilters.js';


const LOCAL_STORAGE_KEY = 'todoApp.todos';


function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('completed');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const newTodoInput = useRef();

  const [colorTheme, setColorTheme] = useState('light');


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
      setFilter('all');
      setFilteredTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    if(todos.length !== 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }
  }, [todos])

  // ADD TODO
  function handleAddTodo() {
    const todoName = newTodoInput.current.value;
    if (todoName === "") {
      return;
    }
    setTodos([...todos, { id: uuidv4(), todoName: todoName, complete: false }]);
    newTodoInput.current.value = null;
  }

  // TOGGLE TODO COMPLETE/NOT COMPLETE
  function toggleTodo(id) {
    const newTodos = [...todos];
    const selectedTask = todos.find(todo => todo.id === id);
    selectedTask.complete = !selectedTask.complete;
    setTodos(newTodos)
  }

  // CLEAR ALL TODOS MARKED COMPLETE
  function handleClear() {
    const remainingTodos = todos.filter(todo => !todo.complete);
    setTodos(remainingTodos);
  }

  // CLEAR TODO WHEN X CLICKED
  function deleteTodo(id) {
    const remainingTodos = todos.filter(todo => todo.id !== id);
    setTodos(remainingTodos);
  }

  // COUNT ANY UNCOMPLETED TODOS
  function countRemaining() {
    const count = todos.filter(todo => !todo.complete);

    if (count.length === 1) {
      return `1 item left`;
    } else {
      return `${count.length} items left`;
    }
  }

  // CHANGE LIST DISPLAYED BASED ON FILTER
  useEffect(() => {
    filterList();
  }, [todos, filter])

  function filterList() {
    if (filter === 'all') {
      setFilteredTodos(todos)
    } else if (filter === 'active') {
      const activeTodos = todos.filter(todo => !todo.complete);
      setFilteredTodos(activeTodos)
    } else if (filter === 'completed') {
      const completedTodos = todos.filter(todo => todo.complete);
      setFilteredTodos(completedTodos)
    }
  }

  // TOGGLE THEME COLORS
  function changeToDarkTheme() {
    setColorTheme('dark')
  }

  function changeToLightTheme() {
    setColorTheme('light')
  }

  return (
    <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme} >
      <main>
      <GlobalStyles />
      
      <Banner />
      <Header changeToDarkTheme={changeToDarkTheme} changeToLightTheme={changeToLightTheme} />

      <TodoInput newTodoInput={newTodoInput} handleAddTodo={handleAddTodo} />

      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

      <TodoFilters 
        countRemaining={countRemaining} 
        setFilter={setFilter}
        handleClear={handleClear}
      />

      <footer>
        <p>Drag and drop to reorder list</p>
      </footer>
      </main>
    </ThemeProvider>
  );
}

export default App;

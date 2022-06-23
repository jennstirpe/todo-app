import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import { lightTheme, darkTheme } from './themes.js';
import GlobalStyles from "./components/styled/Global";
import { StyledMain } from './components/styled/Main.styled.js';
import Banner from './components/Banner.js';
import Header from './components/Header';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoFilters from './components/TodoFilters.js';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [allFilterActive, setAllFilterActive] = useState(true);
  const [activeFilterActive, setActiveFilterActive] = useState(false);
  const [completedFilterActive, setCompletedFilterActive] = useState(false);

  const newTodoInput = useRef();

  const sun = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>`;
  const moon = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>`;

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
      setFilteredTodos(todos);  
      setAllFilterActive(true);
      setActiveFilterActive(false);
      setCompletedFilterActive(false);
    } else if (filter === 'active') {
      const activeTodos = todos.filter(todo => !todo.complete);
      setFilteredTodos(activeTodos);
      setActiveFilterActive(true);
      setAllFilterActive(false);
      setCompletedFilterActive(false);
    } else if (filter === 'completed') {
      const completedTodos = todos.filter(todo => todo.complete);
      setFilteredTodos(completedTodos);
      setCompletedFilterActive(true);
      setAllFilterActive(false);
      setActiveFilterActive(false);
    }
  }

  // TOGGLE THEME COLORS
  function toggleTheme(e) {
    if (colorTheme === "dark") {
      setColorTheme('light');
      e.target.parentElement.innerHTML = moon;
    } else if (colorTheme === 'light') {
      setColorTheme('dark');
      e.target.parentElement.innerHTML = sun;
    }
  }



  return (
    <ThemeProvider theme={colorTheme === 'light' ? lightTheme : darkTheme} >
      <StyledMain>
      <GlobalStyles />
        
      <Banner />
      <Header toggleTheme={toggleTheme} />

      <TodoInput newTodoInput={newTodoInput} handleAddTodo={handleAddTodo} />

      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} classNames={classNames} />

      <TodoFilters 
        countRemaining={countRemaining} 
        setFilter={setFilter}
        handleClear={handleClear}
        allFilterActive={allFilterActive}
        activeFilterActive={activeFilterActive}
        completedFilterActive={completedFilterActive}
      />

    </StyledMain>
    </ThemeProvider>
  );
}

export default App;

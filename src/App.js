import { useState, useRef, useEffect } from 'react';
import GlobalStyles from "./components/styled/Global";
import { ThemeProvider } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import TodoList from './components/TodoList';


const theme = {
  colors: {
    primary: {
      active: 'rgb(58, 123, 253)',
      checkBg: 'linear-gradient rgb(87, 221, 255) to rgb(192, 88, 243)',
    },
    lightMode: {
      bgMain: 'rgb(250, 250, 250)',
      bgTodos: 'rgb(255, 255, 255)',
      mainText: 'rgb(147, 148, 165)',
      todosText: 'rgb(72, 75, 106)',
      borders: 'rgb(228, 229, 241)',
      complete: 'rgb(210, 211, 219)',
      hoverText: 'rgb(72, 75, 106)',
    },
    darkMode: {
      bgMain: 'rgb(22, 23, 34)',
      bgTodos: 'rgb(37, 39, 60)',
      mainText: 'rgb(119, 122, 146)',
      todosText: 'rgb(202, 205, 232)',
      borders: 'rgb(57, 58, 76)',
      complete: 'rgb(77, 80, 102)',
      hoverText: 'rgb(228, 229, 241)',
    }
  },
}

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('completed');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const newTodoInput = useRef();

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
    console.log()
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
  }, [filter])

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



  return (
    <ThemeProvider theme={theme} >
      <>
      <GlobalStyles />
      <header>
        <h1>TODO</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
      </header>

      <main>
        
        <div>
          <input ref={newTodoInput} type="text" placeholder="Create a new todo..." />
          <button onClick={handleAddTodo}>+</button>
        </div>



        <section>
          <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />

          <div>
            <div className="remaining">
              <p>{countRemaining()}</p>
            </div>
            <div className="filters">
              <button onClick={() => setFilter('all')}>All</button>
              <button onClick={() => setFilter('active')}>Active</button>
              <button onClick={() => setFilter('completed')}>Completed</button>
            </div>
            <div className="clear">
              <button onClick={handleClear}>Clear Completed</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>Drag and drop to reorder list</p>
      </footer>
      </>
    </ThemeProvider>
  );
}

export default App;

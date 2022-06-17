import React from 'react'
import { StyledTodo } from './styled/Todo.styled';

export default function Todo({ todo, toggleTodo, deleteTodo }) {
    function handleToggle() {
        toggleTodo(todo.id);
    }

    function handleDelete() {
      deleteTodo(todo.id);
    }

  return (
    <StyledTodo>
        <label className="todo-name">
            <input className="todo-checkbox" type="checkbox" checked={todo.complete} onChange={handleToggle} />
            <span className="custom-checkbox"></span>
            {todo.todoName}
        </label>
        <button className="todo-delete" onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg></button>
    </StyledTodo>
  )
}

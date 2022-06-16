import { StyledTodoInput } from "./styled/TodoInput.styled";

export default function TodoInput({ newTodoInput, handleAddTodo }) {
  return (
    <StyledTodoInput>
        <input className="todoInput" ref={newTodoInput} type="text" placeholder="Create a new todo..." />
        <button className="todoSubmit" onClick={handleAddTodo}>+</button>
    </StyledTodoInput>
  )
}

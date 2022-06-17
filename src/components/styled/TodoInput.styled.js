import styled from "styled-components";

export const StyledTodoInput = styled.div`
    width: 22rem;
    position: relative;
    margin-bottom: 1rem;

    .todo-input, .todo-submit {
        height: 3.25rem;
        border: none;
        background-color: ${({theme})=> theme.bgTodos};
        color: ${({theme})=> theme.todosText};
    }

    .todo-input {
        width: 100%;
        padding-left: 3rem;
        position: relative;
        font-family: 'Josefin Sans', sans-serif;
        border-radius: .4rem;
    }

    .todo-submit {
        position: absolute;
        right: 0;
        width: 2.75rem;
        font-size: 1.25rem;
        border-top-right-radius: .4rem;
        border-bottom-right-radius: .4rem;
    }
`
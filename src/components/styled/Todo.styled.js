import styled from "styled-components";
import checkIcon from "./../../images/icon-check.svg";

export const StyledTodo = styled.div`
   width: 22rem;
   min-height: 3.75rem;
   padding: 0 1rem;
   background-color: ${({theme}) => theme.bgTodos};
   border-bottom: 1px solid ${({theme}) => theme.borders};
   display: flex;
   justify-content: space-between;
   align-items: center;
   position: relative;
   color: ${({theme}) => theme.todosText};
   

   &:first-of-type {
       border-top-left-radius: .4rem;
       border-top-right-radius: .4rem;
   }

   .todo-name {
       overflow-wrap: anywhere;
       padding: .25rem;
       margin-left: 2rem;
       margin-top: .5rem;
       font-size: .83rem;
       display: flex;
       align-items: center;
       justify-content: start;
       width: 80%;
       position: relative;
       left: -2.5rem;
   }

   .todo-checkbox {
       opacity: 0;
       position: absolute;

       &:checked + .custom-checkbox {
        background: url(${checkIcon}), linear-gradient(120deg, #57ddff, #c058f3);
        background-repeat: no-repeat;
        background-position: center;

        &::after  {
           content: "";
           position: absolute;
           top: .75rem;
           right: 0;
           left: 2.25rem;
           height: 2px;
       }
       }
   }

   .custom-checkbox {
       height: 1.3rem;
       min-width: 1.3rem;
       border: 1px solid ${({theme}) => theme.complete};
       border-radius: 50%;
       margin-right: .75rem;
   }

   .todo-delete {
       color: ${({theme}) => theme.complete};
       background: none;
       border: none;
   }

`
import styled from "styled-components";

export const StyledFilters = styled.section`
    background: ${({theme}) => theme.bgTodos};
    position: relative;
    height: 3.75rem;
    border-bottom-left-radius: .4rem;
    border-bottom-right-radius: .4rem;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .83rem;

    .remaining {
        color: ${({theme}) => theme.mainText};
    }

    .filters {
        height: 3.75rem;
        width: 22rem;
        position: absolute;
        left: 0;
        bottom: -5rem;
        display: flex;
        justify-content: space-evenly;
        border-radius: .4rem;
        padding: 0 4.75rem;
        background: ${({theme}) => theme.bgTodos};
        
    }

    .filter {
        font-size: .9rem;
        font-weight: 700;
    }

    .filter, .clear {
        background: none;
        border: none;
        color: ${({theme}) => theme.mainText};
    }
`
import styled from "styled-components";

export const StyledHeader = styled.header`
    height: 6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        color: #FFF;
        padding-top: .5rem;
        letter-spacing: 10px;
        font-weight: 700;
    }

    .toggle-icon {
        background: none;
        border: none;

        &:hover {
            cursor: pointer;
            opacity: .75;
        }
    }
    
    
    @media (min-width: 1440px) {
        margin-top: 1rem;
    }
`
import styled from "styled-components";

export const StyledFooter = styled.footer`
    text-align: center;
    margin-top: 7rem;

    p {
        color: ${({theme}) => theme.mainText};
        font-size: .75rem;
    }

    @media (min-width: 1440px) {
        margin-top: 3.5rem;
    }
`
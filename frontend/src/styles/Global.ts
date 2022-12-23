import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body {
        background: #fff;
        color: #FFF;
        -webkit-font-smoothing: antialiased;
    }

    button{
        cursor: pointer;
    }

    body, input, button {
        font-family: 'Roboto Slab', serif;
        font-size: 16px;  
    }
`;
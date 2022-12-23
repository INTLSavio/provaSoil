import styled, { css } from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Form = styled.form`
    background: #fff;
    height: 80%;
    width: 25%;
    background: transparent;
    border: 2px solid #33cc33;
    border-radius: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    h1 {
        margin-bottom: 10%;
        color: #33cc33;
    }

    a {
        margin-top: 10%;
        text-decoration: none;
        color: #000;
    }

    a:hover {
        color: ${shade(0.7, '#fff')};
    }
`;

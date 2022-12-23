import styled from 'styled-components';

export const Content = styled.div`
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Card = styled.div`
    background: #F4F4F4;
    width: 40%;
    height: 90%;
    border-radius: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8%;

    h1 {
        color: #000;
        margin-top: 5%;
    }

    .select {
        color: #000;
        width: 300px;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    gap: 10%;

`;
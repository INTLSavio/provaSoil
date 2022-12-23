import styled, { css } from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
    isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #F4F4F4;
    border-radius: 10px;
    padding: 16px;
    width: 80%;

    border: 2px solid #F4F4F4;
    color: #000;

    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    ${props =>
        props.isFocused &&
        css`
            color: #33cc33;
            border-color: #33cc33;
        `}

    ${props =>
        props.isFilled &&
        css`
            color: #33cc33;
        `}

    input {
        background: transparent;
        flex: 1;
        border: 0;
        color: #000;

        &::placeholder {
            color: #000;
        }
    }

    svg {
        margin-right: 16px;
    }
`;

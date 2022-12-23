import styled from 'styled-components';

export const Content = styled.div`
    height: 85vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        margin-top: 2rem;
        color: #000;
    }
`;

export const Filtros = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    p {
        color: #000;
    }

    .select {
        color: #000;
        width: 300px;
    }
`;

export const Table = styled.table`
    width: 80%;
    border-spacing: 0 0.5rem;

    tbody {
        h1 {
            color: #000;
        }

        .alimentos {
            color: red;
        }
    }

    th {
        color: #000;
        font-weight: bold;
        padding: 1rem 2rem;
        text-align: left;
        line-height: 1.5rem;
    } 

    td {
        padding: 1rem 2rem;
        border: 0;
        background: #F4F4F4;
        color: #000;

        &:first-child {
            color: #000; 
            border-radius: 1rem 0 0 1rem;
        }

        &:last-child {
            border-radius: 0 1rem 1rem 0;
        }

    }
`;


    

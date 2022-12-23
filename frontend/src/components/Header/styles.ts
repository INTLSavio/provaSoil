import styled from 'styled-components';

import { shade } from 'polished';

export const Container = styled.div`
    height: 15vh;
    background: #33cc33;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;

export const LinksContainer = styled.div`
    a {
        color: #fff;
        text-decoration: none;
        font-size: 20px;
        cursor: pointer;
    }

    a:hover {
        color: ${shade(0.5, '#fff')};
    }

    a + a {
        margin-left: 18px;
    }
`;
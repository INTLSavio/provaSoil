import React from 'react';

import logo from '../../assets/logo_soil.png';

import { Container } from './styles';

export function Carregando() {
    return(
        <Container>
            <img src={logo} alt="Logo" />
            <h1>...</h1>
        </Container>
    );
}
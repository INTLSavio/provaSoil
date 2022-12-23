import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';

import logo from '../../assets/logo_soil.png'

import { Container, LinksContainer } from './styles';

export function Header(){
    let navigate = useNavigate()

    const { authenticated, handleLogout } = useContext(Context);

    function deslogar() {
        handleLogout()
        navigate('/login')
    }

    return(
        <Container>
                <img src={logo} alt="Logo" height={60} width={120} />
                <h1>NO SHAPE 2023</h1>
                <LinksContainer>
                    <a href="/listagem">Listagem</a>
                    <a href="/criacao">Criar Refeição</a>
                    {authenticated && <a onClick={deslogar}>Logout</a>}
                </LinksContainer>
        </Container>
    );
}
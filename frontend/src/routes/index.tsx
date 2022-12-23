import React, { useContext } from 'react';
import { Routes as Router, Route, Navigate} from 'react-router-dom';
import { Context } from '../Context/AuthContext';

import { Cadastro } from '../pages/Cadastro';
import { Criacao } from '../pages/Criacao';
import { Edicao } from '../pages/Edicao';
import { Listagem } from '../pages/Listagem';
import { Login } from '../pages/Login';

const PrivateRoute = ({ children }: any) => {
    const { authenticated } = useContext(Context);

    if(!authenticated){
        return <Navigate to='/login' />
    }

    return children
}

const LoginRoute = ({ children }: any) => {
    const { authenticated } = useContext(Context);

    if(authenticated){
        return <Navigate to='/listagem' />
    }

    return children
}

export function Routes() {
    return(
        <Router>
            <Route path='/' element={<LoginRoute><Login /></LoginRoute>} />
            <Route path='/login' element={<LoginRoute><Login /></LoginRoute>} />
            <Route path='/cadastro' element={<LoginRoute><Cadastro /></LoginRoute>} />
            <Route path='/listagem' element={<PrivateRoute><Listagem /></PrivateRoute>} />
            <Route path='/criacao' element={<PrivateRoute><Criacao /></PrivateRoute>} />
            <Route path='/edicao/:id' element={<PrivateRoute><Edicao /></PrivateRoute>} />
        </Router>
    );
}
import React, { createContext, useEffect, useState } from 'react';

import { api } from '../services/api';

import { Carregando } from '../pages/Carregando';

interface AuthenticateProps {
    authenticated: boolean;
    handleLogin: (loginParams: LoginProps) => Promise<void>;
    loading: boolean;
    handleLogout: () => void;
    setarLoading: (value: boolean) => void;
}

interface LoginProps {
    email: string;
    senha: string;
}

const Context = createContext({} as AuthenticateProps);

function AuthProvider({ children }: any) {

    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }

        setLoading(false);
    }, [])
    
    
    async function handleLogin(loginParams: LoginProps) {
        let dados = ''

        try {
            
            const response = await api.post('/authenticate', loginParams)
            dados = response.data.token
        } catch (error: any) {
            if(error.response.status == 401){
                return alert('As credenciais estão incorretas')
            }
        } 

        if(dados){
            console.log('a')
            localStorage.setItem('token', JSON.stringify(dados))
            api.defaults.headers.Authorization = `Bearer ${dados}`;
            setAuthenticated(true)
            setLoading(false)   
        }
    }

    function setarLoading(value: boolean) {
        setLoading(value);
    }

    function handleLogout() {
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = '';
    }

    if(loading){
        return <Carregando />
    }

    return(
        <Context.Provider value={{ authenticated, handleLogin, loading, handleLogout, setarLoading }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }
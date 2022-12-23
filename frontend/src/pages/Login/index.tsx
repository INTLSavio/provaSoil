import React, { 
    useState,
    useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Form } from './styles';
import { FiMail, FiLock, FiEye } from 'react-icons/fi';

export function Login() {
    let navigate = useNavigate();

    const { handleLogin, loading, setarLoading } = useContext(Context);

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')

    async function logar() {

        try {
            setarLoading(true)
            await handleLogin({ email: user, senha: password })
            setarLoading(false)
        } catch {}

        if(!loading){
            return navigate('/listagem')
        }
    }

    return(
        <Container>
            <Form>
                <h1>LOGIN</h1>

                <Input icon={FiMail} type="text" name="Email" placeholder='Email' value={user} onChange={event => setUser(event.target.value)}/>
                <Input icon={FiLock} type="password" name="Senha" placeholder='Senha' icon2={FiEye} value={password} onChange={event => setPassword(event.target.value)} />
                
                <a href="/cadastro">Não tem conta? Criar uma!</a>
                <Button type='button' onClick={logar}>Entrar</Button>
            </Form>
        </Container>
    );
}
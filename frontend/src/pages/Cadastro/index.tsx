import React, { 
    useState,
    useContext
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context/AuthContext';

import { api } from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Form } from './styles';
import { FiMail, FiLock, FiEye, FiUser } from 'react-icons/fi';


export function Cadastro() {

    let navigate = useNavigate()

    const { loading, setarLoading, handleLogin } = useContext(Context)

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    async function cadastrar() {

        if(!user || !email || !password || !password2) {
            return alert('Preencha todos os campos')
        }

        if(password !== password2){ 
            return alert('As 2 senhas devem ser iguais')
        }
        
        try {
            const usuario = await api.post('/users', { nome: user, email, senha: password})   
        } catch (error: any) {
            if(error.response.status == 409){
                return alert('Usuário já existente')
            }
        }
        
        logar()
    }

    async function logar() {
        setarLoading(true)

        try {
            await handleLogin({ email, senha: password })
            setarLoading(false)
        } catch {}

        if(!loading){
            return navigate('/listagem')
        }
    }

    return(
        <Container>
            <Form>
                <h1>CADASTRO</h1>

                <Input icon={FiUser} type="text" name="User" placeholder='Usuário' value={user} onChange={event => setUser(event.target.value)}/>
                <Input icon={FiMail} type="text" name="Email" placeholder='Email' value={email} onChange={event => setEmail(event.target.value)}/>
                <Input icon={FiLock} type="password" name="Senha" placeholder='Senha' icon2={FiEye} value={password} onChange={event => setPassword(event.target.value)} />
                <Input icon={FiLock} type="password" name="Senha2" placeholder='Confirmar Senha' icon2={FiEye} value={password2} onChange={event => setPassword2(event.target.value)} />

                
                <a href="/login">Já tem uma conta? Fazer Login!</a>
                <Button type='button' onClick={cadastrar}>Cadastrar</Button>
            </Form>
        </Container>
    );
}
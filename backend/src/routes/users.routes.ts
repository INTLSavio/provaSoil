import { Router } from 'express';
import bcryptjs from 'bcryptjs'

import { db } from '../database/index'

export const usersRoutes = Router();

usersRoutes.post('/users', async (req,res) => {

    const { nome, email, senha } = req.body;

    const usersExists = await db('users').select().where({ email })
    
    if(usersExists[0]) {
        return res.sendStatus(409)
    }

    const usuario = {
        nome,
        email,
        senha: bcryptjs.hashSync(senha, 8)
    }

    const usuarioCriado = await db('users').insert(usuario)

    return res.json(usuarioCriado)
})





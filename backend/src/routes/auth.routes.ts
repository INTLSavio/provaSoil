import { Router } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { db } from '../database/index'

export const authRoutes = Router();

authRoutes.post('/authenticate', async (req, res) => {

    const { email, senha } = req.body;
    
    const user = await db('users').select().where({email})

    if(!user) {
        return res.sendStatus(401);
    }
    const userEncontrado = user[0]

    if(!userEncontrado) {
        return res.sendStatus(401);
    }

    const isValidPassword = await bcryptjs.compare(senha, userEncontrado.senha)

    if(!isValidPassword){
        return res.sendStatus(401);
    }

    const token = jwt.sign({ id: userEncontrado.id }, `${process.env.SECRET}`, { expiresIn: '1d'})

    delete userEncontrado.senha

    return res.json({
        userEncontrado,
        token
    })
})
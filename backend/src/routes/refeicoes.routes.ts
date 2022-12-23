import { Router } from 'express';

import { authMiddleware } from '../middlewares/authMiddleware';

import { db } from '../database/index'

export const refeicoesRoutes = Router();

refeicoesRoutes.get('/refeicoes', authMiddleware, async (req, res) => {

    const response = await db('refeicoes').select().where({ user_id: req.userId })

    return res.json(response)
})

refeicoesRoutes.get('/refeicao/:id', authMiddleware, async (req, res) => {

    const { id } = req.params

    const response = await db('refeicoes').select().where({ id })

    return res.json(response)
})

refeicoesRoutes.get('/filtros', authMiddleware, async (req, res) => {

    const response = await db('refeicoes').select().where({ user_id: req.userId }).min('data').max('data')

    return res.json(response) 
})

refeicoesRoutes.post('/refeicoes', authMiddleware, async (req,res) => {

    const { tipo, alimentos, data, user_id } = req.body;

    const refeicao = {
        tipo,
        alimentos,
        data,
        user_id: req.userId
    }

    const refeicaoCriada = await db('refeicoes').insert(refeicao)

    return res.json(refeicaoCriada)
})

refeicoesRoutes.put('/refeicoes/:id', authMiddleware, async (req, res) => {

    const { id } = req.params;
    const { tipo, alimentos, data, user_id } = req.body;

    const refeicao = {
        tipo,
        alimentos,
        data,
        user_id: req.userId
    }

    const refeicaoAtualizada = await db('refeicoes').update(refeicao).where({ id })

    return res.json(refeicaoAtualizada);
})

refeicoesRoutes.delete('/refeicoes/:id', authMiddleware, async (req, res) => {
    
    const { id } = req.params;
    
    const refeicaoDeletada = await db('refeicoes').delete().where({ id });

    return res.json(refeicaoDeletada)
})


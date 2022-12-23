import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { refeicoesRoutes } from './routes/refeicoes.routes';
import { usersRoutes } from './routes/users.routes';
import { authRoutes } from './routes/auth.routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(authRoutes)
app.use(refeicoesRoutes)
app.use(usersRoutes)

app.listen(3333, () => {
    console.log('API Running')
})
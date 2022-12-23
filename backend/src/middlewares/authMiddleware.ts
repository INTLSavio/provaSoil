import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import * as dotenv from "dotenv";

dotenv.config();

interface TokenPayload {
    id: string;
    iat: number;
    exp: number;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
   const { authorization } = req.headers; 

   if(!authorization) {
    return res.sendStatus(401)
   } 

   const token = authorization.replace('Bearer', '').trim();

   try {
    const data = jwt.verify(token, `${process.env.SECRET}`)
    const { id } = data as TokenPayload;

    req.userId = id;

    return next();
   } catch {
        return res.sendStatus(401)
   }
}
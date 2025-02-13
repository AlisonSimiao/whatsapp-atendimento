import express from 'express';
import {privateRoute, publicRoute} from './routes';
import cors from 'cors';
import { AuthMiddleware } from './middlewares/auth.middleware';
import {inatiateDatabase} from './database';
import {config} from 'dotenv';

config()

inatiateDatabase()

const app = express();

app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use(publicRoute);
app.use(AuthMiddleware.Init)
app.use(privateRoute);




export default app;




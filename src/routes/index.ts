import Router, { Request, Response } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import whatsappRouter from './whatsapp.routes';
import pg from '../../package.json';
import { WhatsappService } from '../resources/whatsapp/whatsapp.service';

const privateRoute = Router();
const publicRoute = Router();

privateRoute.use('/users', userRouter)
privateRoute.use('/whatsapp', whatsappRouter)
publicRoute.use((req: Request, res, next) =>{
    console.log(req.url)
    next()
})

publicRoute.use('/api-docs', swaggerUi.serve);
publicRoute.get('/api-docs', swaggerUi.setup(swaggerDocument));

publicRoute.use('/auth', authRouter)

publicRoute.get('/', (req: Request, res: Response) => {
    res.send({
        name: pg.name,
        version: pg.version,
        conections: Object.keys(WhatsappService.connections).length
    })
})

export  {
    publicRoute,
    privateRoute
};


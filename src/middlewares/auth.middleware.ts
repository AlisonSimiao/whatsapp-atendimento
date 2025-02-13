import { NextFunction, Request, Response } from "express";
import { JWTService } from "../resources/jwt/jwt.service";
import prisma from "../database";
import { ResponseError } from "../responses";
import { ForbiddenError, PaymentRequiredError } from "../erros";
import { EEmpresaStatus, empresa, User } from "@prisma/client";
const jwt = new JWTService()

export type TRequest = Request & {
    user: User & {
        Empresa: empresa
        }
}

export class AuthMiddleware {
    static async Init(req: Request, res: Response, next: NextFunction) {
        
        try {
            const { id } = jwt.signin(req.headers.authorization?.split(' ')[1] || "")

            const user = await prisma.user.findUnique({
                where: {
                    id
                },
                include:{
                    Empresa: true
                }
            })

            if (!user)
                throw new ForbiddenError('usuario sem permissão');

            if(user.Empresa.status === EEmpresaStatus.BLOQUEADO)
                throw new PaymentRequiredError('Empresa bloqueada por falta de pagamento');

            (req as TRequest)['user'] = user
            
            next()
        }
        catch (err) {
            ResponseError(res, err as Error)
        }        
    }
}
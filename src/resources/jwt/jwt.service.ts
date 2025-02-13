import jwt from 'jsonwebtoken'
import { UnAuthorizedError } from '../../erros';

export class JWTService {
    create(data: Record<string, any>): string{
        return jwt.sign(data, process.env.JWT_SECRET as string)
    }

    signin<T extends Record<string, any>>(token: string): T{
        if(!token) throw new UnAuthorizedError('token deve ser enviado nos headers');

        return jwt.verify(token, process.env.JWT_SECRET as string) as T
    }
}
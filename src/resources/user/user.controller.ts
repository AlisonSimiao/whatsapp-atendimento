import { Response, Request } from "express"
import { Created, ResponseError, Success } from "../../responses"
import { UserService } from "./user.service"
import { EmailService } from "../email/email.service"
import { TRequest } from "../../middlewares/auth.middleware"

export class UserController {
    async create({ body }: Request, res: Response) {
        try {
            const userService = new UserService(new EmailService())
            await userService.create(body)

            return Created(res, {})
        }
        catch(err){
            ResponseError(res, err as Error)
        }
    }

    async update(req: Request, res: Response) {
        try{
            const { user } = req as TRequest
            const userService = new UserService()
            await userService.update(user.id, req.body) 

            return Success(res, {message: 'usuario atualizado com sucesso'})
        }
        catch(err){
            ResponseError(res, err as Error)
        }
        
    }
}
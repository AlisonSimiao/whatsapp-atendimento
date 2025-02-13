import { Response, Request } from "express"
import { ResponseError, Success } from "../../responses"
import { AuthService } from "./auth.service"
import { EmailService } from "../email/email.service"
import { TRequest } from "../../middlewares/auth.middleware"

export class AuthController {
    async login({ body }: Request, res: Response) {
        try {
            const authService = new AuthService()
            const userLogin = await authService.login(body)

            return Success(res, userLogin)
        }
        catch(err){
            ResponseError(res, err as Error)
        }
    }
}
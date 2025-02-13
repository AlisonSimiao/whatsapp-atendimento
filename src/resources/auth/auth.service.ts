import prisma from "../../database"
import { UnAuthorizedError } from "../../erros"
import { ILoginData, ILoginResult } from "../../typing/auth"
import { comparePassword } from "../crypto"
import { JWTService } from "../jwt/jwt.service"
import { WhatsappService } from "../whatsapp/whatsapp.service"

export class AuthService {
    private jwtService: JWTService
    private whatsappService: WhatsappService

    constructor(){
        this.jwtService = new JWTService()
        this.whatsappService = new WhatsappService()
    }

    async login(data: ILoginData): Promise<ILoginResult> {
        const auth = await prisma.user.findFirst({
            where: {
                email: data.email 
            },
            include: {
                Empresa: true
            }
        })

        if (!auth)
            throw new UnAuthorizedError("Email ou Senha incorretos")

        if (!comparePassword(data.senha, auth.senha))
            throw new UnAuthorizedError("Email ou Senha incorretos")
        
        const token = this.jwtService.create({
            id: auth.id,
        })

        auth.senha = ''

        await this.whatsappService.createConnection(auth.Empresa)

        return {
            user: auth,
            token
        } as ILoginResult
    }
}
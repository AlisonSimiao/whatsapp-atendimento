import { EEmpresaStatus, ERole, User } from "@prisma/client"
import prisma from "../../database"
import { ConflictError, NotFundError } from "../../erros"
import { encryptPassword } from "../crypto"
import { IEmailService } from "../../typing/email"
import { IUserUpdate } from "../../typing/user"
import { add } from "date-fns"

export class UserService {
    constructor(private emailService?: IEmailService){}

    async findOne(email: string) {
        const user = await prisma.user.findFirst({
            where: {
                email
            },
            select: {
                nome: true,
                sobrenome: true,
                email: true,
                cpf: true,
                telefone: true,
                dataNascimento: true,
            }
        })

        if (!user)
            throw new NotFundError("Usuário não encontrado")

        return user
    }

    async create(user: User) {
        const userEmail = await prisma.user.findFirst({
            where: {
                email: user.email
            }
        })

        if (userEmail)
            throw new ConflictError("Email já cadastrado")
        
        const userCpf = await prisma.user.findFirst({
            where: {
                cpf: user.cpf
            }
        })

        if (userCpf)
            throw new ConflictError("cpf já cadastrado")

        user.senha = encryptPassword(user.senha)
        const plano = await prisma.plano.findFirst({
            where: {
                id: 1
            },
            select: {
                max: true
            }
        })
        await prisma.user.create({
            data: {
                nome: user.nome,
                sobrenome: user.sobrenome,
                email: user.email,
                senha: user.senha,
                cpf: user.cpf,
                telefone: user.telefone,
                dataNascimento: user.dataNascimento,
                role: ERole.ADMIN,
                Empresa: {
                    create: {
                        nome: user.nome,
                        status: EEmpresaStatus.ATIVO,
                        codigo: user.email,
                        ativo_em: new Date(),
                        ativo_ate: add(new Date(), { days: plano?.max }),
                        Session: {
                            create: {
                                data: '{}'
                            }
                        }
                    }
                }
            }
        })

       await this.emailService?.confirmEmail(user.email, { nome: user.nome })
        .catch(err => console.log(err))
    }

    async update(id: number, data: IUserUpdate) {
        if(data.email){

        const user = await prisma.user.findFirst({
            where: {
                email: data.email,
                id: {
                    not: id 
                }
            }
        })

        if (user)
            throw new ConflictError("Email já cadastrado")
        }

        if (data.cpf){
            const user = await prisma.user.findFirst({
                where: {
                    cpf: data.cpf,
                    id: {
                        not: id
                    }
                }
            })
    
            if (user)
                throw new ConflictError("cpf já cadastrado")
    
        }

        if(data.senha)
            data.senha = encryptPassword(data.senha)

        await prisma.user.update({
            where: {
                id
            },
            data: {
                dataNascimento: data.dataNascimento,
                nome: data.nome,
                sobrenome: data.sobrenome,
                email: data.email,
                senha: data.senha,
                cpf: data.cpf,
                telefone: data.telefone,
            }
        })

    }
}
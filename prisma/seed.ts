import { add } from "date-fns"
import prisma from "../src/database"
import { encryptPassword } from "../src/resources/crypto"

async function main(){
    const days = 7

    await prisma.plano.create({
        data: {
            id: 1,
            nome: 'Plano Teste',
            valor: 0,
            status: 'ATIVO',
            max: days,
        }
    })

    await prisma.user.create({
        data: {
            nome: 'admin',
            email: 'admin@email.com',
            sobrenome: 'Admin',
            cpf: '00000000000',
            senha: encryptPassword('admin'),
            Empresa: {
                create: {
                    nome: 'Empresa Teste',
                    cnpj: '12345678901234',
                    status: 'ATIVO',
                    ativo_em: new Date(),
                    ativo_ate: add(new Date(), { days }),
                    Session: {
                        create: {
                            data: '{}'
                        }
                    }
                }
            }
        }
    })
}   

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
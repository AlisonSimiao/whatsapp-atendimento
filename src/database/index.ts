import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

prisma
    .$connect()
    .catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    })

export const inatiateDatabase = async () => {
    return prisma
    .$connect().then(() => {
        console.log('connected to database')
    }).catch((err) => {
        console.error('error connecting to database', err)
        throw err;
    })
}

export default prisma
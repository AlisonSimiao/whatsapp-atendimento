import { createHash } from "node:crypto"

export async function comparePassword(senha: string, md5: string) {
    return createHash('md5').update(senha).digest("hex") === md5
}

export function encryptPassword(senha: string) {
    return createHash('md5').update(senha).digest("hex")
}
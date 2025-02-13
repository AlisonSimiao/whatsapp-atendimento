import { Meta } from "express-validator";
const translateLocation = {
    body: 'campo',
    params: 'parametro',
    query: 'query',
    headers: 'header',
    cookies: 'cookie'
}

export const message = {
    isLength: (min: number, max: number) => (_: string, {path, location}: Meta) => `o ${translateLocation[location]} ${path} deve ter entre ${min} e ${max} caracteres`,
    isEmail: (_: string, {path, location}: Meta) => `o ${translateLocation[location]} ${path} deve ser um email valido`,
    isRequired: (_: string, {path, location}: Meta) => `o ${translateLocation[location]} ${path} é obrigatorio`,
    isEmpty: (_: string, {path, location}: Meta) => `o ${translateLocation[location]} ${path} não pode estar vazio`,
    isDate: (format: string) => (_: string, {path, location}: Meta) => `o ${translateLocation[location]} ${path} deve ser uma data valida no formato ${format}`,
    isMobilePhone: (_: string, {path, location}: Meta) => `o ${translateLocation[location]} ${path} deve ser um numero de telefone valido`,
    isInteger: (_: string, {path, location}: Meta) => ``,
    isString: () => ``
}
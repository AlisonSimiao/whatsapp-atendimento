import { User } from "@prisma/client";

export type TUser = Omit<User, 'id' | 'senha'> 

export interface IUserCreate {
    nome: string;
    sobrenome?: string;
    email: string;
    senha: string;
    telefone?: string;
    cpf: string;
    dataNascimento?: string;
}

export interface IUserUpdate {
    nome?: string;
    sobrenome?: string;
    email?: string;
    senha?: string;
    telefone?: string;
    cpf?: string;
    dataNascimento?: string;
}
import { TUser } from "./user";

export interface ILoginData {
    email: string
    senha: string
}

export interface ILoginResult{
    user: TUser
    token: string
}
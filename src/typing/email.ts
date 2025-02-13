export interface IEmailService {
    sendEmail(to: string, body: Record<string, any>): Promise<void>;
    recoveryPassword(to: string, body: Record<string, any>): Promise<void>;
    confirmEmail(to: string, body: Record<string, any>): Promise<any>;
}

export interface IEmailBodyConfirm {
    nome: string,
}
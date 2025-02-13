import { UnprocessableEntityError } from "../../erros";
import { IEmailBodyConfirm, IEmailService } from "../../typing/email";
import nodemailer, { Transporter } from 'nodemailer'

interface TConfirm  { 
    nome: string,
    linkConfirm: string
}

export class EmailService implements IEmailService {
    private mailer: Transporter;
    private htmlEmail: Record<string, (body: any) => any>;

    constructor() { 
        this.mailer = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE, // Use o serviço de e-mail (Gmail, Outlook, etc.)
            auth: {
              user: process.env.EMAIL_USER, // Seu endereço de e-mail
              pass: process.env.EMAIL_PASS,   // Sua senha ou app key (se 2FA estiver habilitado)
            },
          });
          this.htmlEmail = {
            confirm: ({nome, linkConfirm}: TConfirm): string => {
                return  `
                <!DOCTYPE html>
                <html lang="en">
    
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Email Confirmation</title>
                <style>
                    /* Reset */
                    body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    }
    
                    table {
                    border-spacing: 0;
                    width: 100%;
                    }
    
                    td {
                    padding: 0;
                    }
    
                    /* Container */
                    .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
    
                    /* Header */
                    .email-header {
                    background-color: #4CAF50;
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    }
    
                    .email-header h1 {
                    margin: 0;
                    font-size: 24px;
                    }
    
                    /* Body */
                    .email-body {
                    padding: 20px;
                    color: #333333;
                    font-size: 16px;
                    line-height: 1.5;
                    }
    
                    .email-body p {
                    margin: 0 0 15px;
                    }
    
                    .email-body a {
                    display: inline-block;
                    margin-top: 20px;
                    background-color: #4CAF50;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 12px 20px;
                    border-radius: 4px;
                    font-weight: bold;
                    }
    
                    .email-body a:hover {
                    background-color: #45a049;
                    }
    
                    /* Footer */
                    .email-footer {
                    text-align: center;
                    padding: 15px;
                    font-size: 12px;
                    color: #777777;
                    background-color: #f9f9f9;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                    }
    
                    .email-footer a {
                    color: #4CAF50;
                    text-decoration: none;
                    }
                </style>
                </head>
    
                <body>
                <table role="presentation" class="email-container">
                    <tr>
                    <td class="email-header">
                        <h1>Confirme seu Email</h1>
                    </td>
                    </tr>
                    <tr>
                    <td class="email-body">
                        <p>Olá, ${nome}</p>
                        <p>Obrigado por se cadastrar! Clique no botão abaixo para confirmar seu email.</p>
                        <p>
                        <a href="${linkConfirm}" target="_blank">Confirmar Email</a>
                        </p>
                        <p>Se você não solicitou este email, pode ignorá-lo com segurança.</p>
                    </td>
                    </tr>
                    <tr>
                    <td class="email-footer">
                        <p>© ${(new Date).getFullYear()} ${process.env.PROJECT_NAME}. Todos os direitos reservados.</p>
                    </td>
                    </tr>
                </table>
                </body>
    
                </html>
                `
            }
          }
    }
    recoveryPassword(to: string, body: Record<string, any>): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async confirmEmail(to: string, body: IEmailBodyConfirm): Promise<Record<string, string | number>> {
        const link = process.env.HOST?.concat('/confirmEmail','?email=' + to)
        const emailParams = {
            from: process.env.EMAIL_USER,     // Remetente
            to,     // Destinatário
            subject: '[Mensagem automatica] - Confirmação de email',     // Assunto
            html: this.htmlEmail.confirm(body.nome, link),
          };

        return this.mailer.sendMail(emailParams).catch((err) => {
            console.log(err)
            throw new UnprocessableEntityError(['Erro ao enviar email'])
        });
    }

    async sendEmail(email: string, body: Record<'message', string>): Promise<void> {
        console.log(`Sending email to ${email}: ${body.message}`);
    }

}
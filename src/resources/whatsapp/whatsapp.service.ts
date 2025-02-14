import { Client, LocalAuth } from "whatsapp-web.js";
import prisma from "../../database";
import { NotFundError } from "../../erros";
import { empresa } from "@prisma/client";
import { encryptPassword } from "../crypto";
import { Interface } from "node:readline";

interface IConection {
    [key: string]: Client
}
export class WhatsappService {
    public static connections: IConection = {};


    async createConnection(empresa: empresa) {
        
        if(empresa.online)
            return;

        const clientId: string = empresa.codigo || empresa.cnpj || encryptPassword(Date())

        if(!empresa.codigo){
            await prisma.empresa.update({
                where: {
                    id: empresa.id
                },
                data: {
                    codigo: clientId
                }
            })
        }

        const client = new Client({
            puppeteer: { headless: true },
            authStrategy: new LocalAuth({
                clientId,
                dataPath: `./sessions/${clientId}`,
             }),
        })

        client.once('ready', async () => {
            await prisma.empresa.update({
                where: {
                    codigo: clientId
                },
                data: {
                    online: true
                }
            })

            console.log(`empresa com codigo '${clientId}' is ready!`);
        });

        // When the client received QR-Code
        client.on('qr', async (qr: string) => {
            console.log('QR RECEIVED', {
                client: clientId,
                qr,
            });
            
            await prisma.empresa.update({
                where: { codigo: clientId },
                data: { qrCode: qr },
            });
        });

        client.on('authenticated', async (session) => {
            console.log('AUTHENTICATED', {
                client: clientId,
                session,
            });

            await prisma.empresa.update({
                where: { codigo: clientId },
                data: { 
                    online: true,
                    Session: {
                        update:{
                            data: {
                                session: JSON.stringify(session),
                            }
                        }
                    } 
                },
            }
            );
        });

        client.initialize();
    }

    async qr(empresa: empresa): Promise<string> {
        
        if (!empresa.qrCode)
            throw new NotFundError(`QRCode não encontrado para empresa '${empresa.codigo}'`);

        return empresa.qrCode;
    }
}
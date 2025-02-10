import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode';
import { Request, Response } from 'express';
const banco = {
    empresas: [
        {
            id: 1,
            nome: 'Empresa 1',
            qr: '',
            users: [],
            logged: false
        }
        
    ]
}

const app = require('express')();

app.get('/qr/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const size = req.query.size ? parseInt(req.query.size as string) : 300;
        const empresa = banco.empresas.find((e) => e.id === id);

        if (!empresa) {
            return res.status(404).json({ error: "Empresa não encontrada" });
        }

        const qrImage = await qrcode.toBuffer(empresa.qr, {
            width: size,
            type: "png",
        });

        res.setHeader("Content-Type", "image/png");
        res.status(200).send(qrImage);
    } catch (error) {
        console.error("Erro ao gerar QR Code:", error);
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});



// Create a new client instance
const client = new Client({
    puppeteer: { headless: true },
    authStrategy: new LocalAuth({
        clientId: 'your-client-id',
        dataPath: 'path-to-store-data',
    }),
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr: string) => {
    console.log('QR RECEIVED', qr);
    banco.empresas[0].qr = qr;
});

// Start your client
client.initialize();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
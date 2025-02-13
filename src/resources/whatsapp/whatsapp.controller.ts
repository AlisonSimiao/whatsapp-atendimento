import { Request, Response } from "express";
import { WhatsappService } from "./whatsapp.service";
import { ResponseError } from "../../responses";
import { TRequest } from "../../middlewares/auth.middleware";
import qrcode from 'qrcode';

export class WhatsappController {
    async qr(req: Request, res: Response) {
        try {
            const user = (req as TRequest).user;
            const whtService = new WhatsappService();
            const img = await whtService.qr(user.Empresa);

            qrcode.toBuffer(img, (err, buffer) => {

                if (err) throw err;
                res.writeHead(200, {
                    'Content-Type': 'image/png',
                    'Content-Length': buffer.length
                });

                res.end(buffer);
            });
        }
        catch (error) {
            ResponseError(res, error as Error)
        }
    }
}
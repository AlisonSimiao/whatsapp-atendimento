import { Router } from "express";
import { WhatsappController } from "../resources/whatsapp/whatsapp.controller";

const routes = Router()
const whatsappController = new WhatsappController()

routes.get('/qr', whatsappController.qr)

export default routes
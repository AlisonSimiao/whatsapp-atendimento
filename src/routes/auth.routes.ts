import { Router } from "express";
import { AuthController } from "../resources/auth/auth.controller";
import { UserController } from "../resources/user/user.controller";
import { validate } from "../middlewares/validator.middleware";
import { login, signup } from "../validator/auth.validator";

const  routes = Router()

const authController = new AuthController()
const userController = new UserController()

routes.post('/login', validate(login), authController.login)
routes.post('/signup', validate(signup), userController.create)

export default routes
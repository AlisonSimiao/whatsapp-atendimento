import {Router} from 'express'
import { UserController } from '../resources/user/user.controller';
import { validate } from '../middlewares/validator.middleware';
import {update} from './../validator/user.validator'
const routes = Router()

const userController = new UserController()

routes.patch('', validate(update), userController.update)

export default routes;
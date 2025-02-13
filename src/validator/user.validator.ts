import { body } from "express-validator";
import { message } from "./index.validator";
import { constants } from "../config/constants";

export const update = [
        body('telefone')
            .optional()
            .notEmpty()
            .withMessage(message.isEmpty)
            .isMobilePhone('pt-BR').withMessage(message.isMobilePhone),
        body('dataNascimento')
            .optional()
            .notEmpty()
            .withMessage(message.isEmpty)
            .isDate({format: constants.FORMAT.DATE_ONLY}).withMessage(message.isDate(constants.FORMAT.DATE_ONLY)),
        body('nome')
            .optional()
            .notEmpty()
            .withMessage(message.isEmpty)
            .isLength({max: 250}).withMessage(message.isLength(1, 250)),
        body('cpf')
            .optional()
            .notEmpty()
            .withMessage(message.isEmpty)
            .isLength({max: 11, min: 11}).withMessage(message.isLength(11, 11)),
        body('sobrenome')
            .optional()
            .notEmpty()
            .withMessage(message.isEmpty)
            .isLength({max: 250}).withMessage(message.isLength(1, 250)),
        body('email')
            .optional()
            .notEmpty()
            .withMessage(message.isEmpty)
            .isEmail()
            .withMessage(message.isEmail)
            .isLength({max: 250}).withMessage(message.isLength(1, 250)),
        body('senha')
            .optional()
            .notEmpty()
            .withMessage(message.isEmpty)
            .isLength({max: 250, min: 3}).withMessage(message.isLength(3, 250)),
]
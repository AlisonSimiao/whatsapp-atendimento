import { body } from "express-validator";
import { message } from "./index.validator";
import { constants } from "../config/constants";

export const login = [
    body('email')
        .notEmpty()
        .withMessage(message.isRequired),
    body('senha')
        .notEmpty()
        .withMessage(message.isRequired),
]

export const signup = [
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
        .notEmpty()
        .withMessage(message.isRequired)
        .isLength({max: 250}).withMessage(message.isLength(1, 250)),
    body('cpf')
        .notEmpty()
        .withMessage(message.isRequired)
        .isLength({max: 11, min: 11}).withMessage(message.isLength(11, 11)),
    body('sobrenome')
        .optional()
        .notEmpty()
        .withMessage(message.isEmpty)
        .isLength({max: 250}).withMessage(message.isLength(1, 250)),
    body('email')
        .notEmpty()
        .withMessage(message.isRequired)
        .isEmail()
        .withMessage(message.isEmail)
        .isLength({max: 250}).withMessage(message.isLength(1, 250)),
    body('senha')
        .notEmpty()
        .withMessage(message.isRequired)
        .isLength({max: 250, min: 3}).withMessage(message.isLength(3, 250)),
]
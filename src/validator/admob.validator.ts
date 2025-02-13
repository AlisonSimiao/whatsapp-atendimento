import { query } from "express-validator";
import { message } from "./index.validator";

export const callback = [
    query('user_id')
        .notEmpty().withMessage(message.isRequired),
    query('reward_type')
        .notEmpty().withMessage(message.isRequired),
    query('reward_amount')
        .isInt().withMessage(message.isInteger),
    query('transaction_id')
        .notEmpty().withMessage(message.isRequired),
    query('ad_unit_id')
        .notEmpty().withMessage(message.isRequired),
    query('custom_data')
        .optional()
        .isString().withMessage(message.isString)
]
import { Response } from "express";
import { EError } from "./../typing/error"
import { JsonWebTokenError } from "jsonwebtoken";

export function Success(res: Response, body: Record<string, string | number>){
    res.status(200).json(body);
}

export function download(res: Response, body: string){
    res.status(200).download(body);
}

export function Created(res: Response, body: Record<string, unknown>){
    res.status(201).json(body)
}

export function BadRequestErro(res: Response, message: unknown){
    res.status(400).json({message})
}

export function UnprocessableEntityErro(res: Response, message: unknown){
    res.status(422).json({message})
}

export function ConflictError(res: Response, message: unknown){
    res.status(409).json({message})
}

export function UnauthorizedError(res: Response, message: unknown){
    res.status(401).json({message})
}

export function ForbiddenError(res: Response, message: unknown){
    res.status(403).json({message})
}

export function notFoundError(res: Response, message: unknown){
    res.status(404).json({message})
}

export function internalError(res: Response){
    res.status(500).json({message: 'server internal error'})
}

export function PaymentRequeredError(res: Response, message: unknown){
    res.status(402).json({message})
}

export function ResponseError(res: Response, err: Error | JsonWebTokenError){

    const func: (res: Response, message: unknown) => void = {
        [EError.NOT_FOUND]: notFoundError,
        [EError.BAD_REQUEST]: BadRequestErro,
        [EError.UNAUTHORIZED]: UnauthorizedError,
        [EError.FORBIDDEN]: ForbiddenError,
        [EError.UNPROCESSABLE_ENTITY]: UnprocessableEntityErro,
        [EError.CONFLICT]: ConflictError,
        [EError.JSON_WEB_TOKEN]: UnauthorizedError,
        [EError.PAYMENT_REQUIRED]: PaymentRequeredError
    }[err.name] || (console.log(err), internalError)

    func(res, err.message)
}
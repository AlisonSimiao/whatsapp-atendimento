import { AlternativeValidationError } from "express-validator"
import { EError } from "../typing/error"

export class NotFundError extends Error {
    constructor(public message: string) {
        super(message)
        this.name = EError.NOT_FOUND
    }
}

export class PaymentRequiredError extends Error {
    constructor(public message: string) {
        super(message)
        this.name = EError.PAYMENT_REQUIRED
    }
}

export class ConflictError extends Error {
    constructor(public message: string) {
        super(message)
        this.name = EError.UNPROCESSABLE_ENTITY
    }
}

export class UnprocessableEntityError extends Error {
    constructor(message: any[]) {
        super('')
        this.message = JSON.stringify(message)
        this.name = EError.UNPROCESSABLE_ENTITY
    }
}

export class BadRequestError extends Error {

    constructor(public message: string) {
        super(message)
        this.name = EError.BAD_REQUEST
    }
}

export class UnAuthorizedError extends Error {
    constructor(public message: string) {
        super(message)
        this.name = EError.UNAUTHORIZED
    }
}

export class ForbiddenError extends Error {
    constructor(public message: string) {
        super(message)
        this.name = EError.FORBIDDEN
    }
}
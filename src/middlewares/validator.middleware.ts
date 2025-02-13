import { NextFunction, Request, Response } from "express";
import { ValidationChain } from "express-validator";
import { ResponseError } from "../responses";
import { UnprocessableEntityError } from "../erros";

// can be reused by many routes
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    // sequential processing, stops running validations chain if one fails.
    const erros = []
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) 
        erros.push(result.array()[0]);
    }

    if (erros.length > 0)
      return ResponseError(res, new UnprocessableEntityError(erros))
    
    next();
  };
};

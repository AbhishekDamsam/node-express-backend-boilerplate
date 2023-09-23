import { NextFunction, Request, Response } from "express";
import * as Joi from 'joi';


export const validate = function (schema: Joi.ObjectSchema, requestPart: 'body' | 'query' |'params') {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[requestPart], { abortEarly: false });
        if (error) {
            res.status(400).json({
                error: error.details.map((item) => {
                    return {
                        message: item.message
                    }
                }),
                data: []
            });
        } else {
            next();
        }
    }
}
import HttpException from "../helpers/http-exception";
import { Request, Response, NextFunction } from "express";


export const errorHandler = (
  error: HttpException,
  _: Request, // eslint-disable-line no-unused-vars
  response: Response,
  __: NextFunction // eslint-disable-line no-unused-vars
) => {
  return response.status(error.statusCode || error.status || 500).send({
    error: error.message,
    data: []
  })
};

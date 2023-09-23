import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  _: Request, // eslint-disable-line no-unused-vars
  response: Response,
  __: NextFunction // eslint-disable-line no-unused-vars
) => response.status(404).send("Resource not found");
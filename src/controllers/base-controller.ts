import { Response } from "express";


export class BaseController {
    constructor(){

    }

    send(res: Response, status: number = 200){
        if(!Array.isArray(res.locals?.data)){
            res.locals.data = res.locals.data ? [res.locals.data] : [];
        }
        res.status(status).send({
            error: res.locals?.error ?? "",
            data: res.locals.data,
        })
    }
}
import { NextFunction, Request, Response } from "express";
import { assetService } from "../services/index";
import HttpException from "../helpers/http-exception";
import { BaseController } from "./base-controller";


export class AssetController extends BaseController {
    constructor() {
        super();
    }
    async create(req: Request, res: Response, next: NextFunction) {
        const { name, description } = req.body;
        const fileType = Math.floor(Math.random() * 5) + 1; // Assuming FileType const enum will be between 1-5
        try {
            res.locals.data = await assetService.createAsset({ name, description, fileType });
            super.send(res, 201);
        }
        catch (err) {
            if (err instanceof Error) {
                return next(new HttpException(500, err.message))
            }
        }
    }

    async getSingle(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await assetService.getAsset(req.params.uuid);
            if (!data) {
                res.locals.error = "Not Found";
                return super.send(res, 404);
            }
            res.locals.data = data;
            super.send(res, 200);
        }
        catch (err) {
            if (err instanceof Error) {
                return next(new HttpException(500, err.message))
            }
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            res.locals.data = await assetService.getAssets();
            super.send(res, 200);
        }
        catch (err) {
            if (err instanceof Error) {
                return next(new HttpException(500, err.message))
            }
        }
    }

    async deleteAsset(req: Request, res: Response, next: NextFunction) {
        try {
            const IsDeleted = await assetService.deleteAsset(req.params.uuid);
            if (!IsDeleted) {
                res.locals.error = "Not Found";
                return super.send(res, 404);
            }
            super.send(res, 204);
        }
        catch (err) {
            if (err instanceof Error) {
                return next(new HttpException(500, err.message))
            }
        }
    }
}

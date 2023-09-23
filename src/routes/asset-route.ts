
import express from 'express';
import { assetController } from '../controllers/index';
import * as Joi from 'joi';
import { validate } from '../middlewares/input-validation';

const assetRouter = express.Router();

export const AssetId = Joi.object().keys({
    uuid: Joi.string().uuid().required(),
});

export const createAsset = Joi.object().keys({
    name: Joi.string().required().max(50),
    description: Joi.string().max(100),
    file: Joi.string(),
});

assetRouter.get("/assets/:uuid", validate(AssetId, 'params'), assetController.getSingle);
assetRouter.get("/assets", assetController.getAll);
assetRouter.post("/assets", validate(createAsset, 'body'), assetController.create);
assetRouter.delete("/assets/:uuid", validate(AssetId, 'params'), assetController.deleteAsset);


export default assetRouter;
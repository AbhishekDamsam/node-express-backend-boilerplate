export * from "../services/asset-service";


import { AssetService } from "./asset-service";

const assetService = new AssetService();

export {
    assetService
}
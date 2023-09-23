import { Router } from "express";
import assetRouter from "./asset-route";

const Routes: Router[] = [
    assetRouter,
];

export default Routes;
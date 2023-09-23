import request from 'supertest';
import app from '../src/app';
import { getDbClient } from '../getDbClient';
import { AssetRequest, AssetResponse } from "../src/models/Asset-model"

const client = getDbClient();


describe('Asset Tests', function () {

    beforeAll(async () => {
        await client.connect();
    })

    describe('POST Asset', () => {
        const name = "New asset";
        const description = "Test description";
        let assetId: string;
        const input: AssetRequest = {
            name,
            description
        }
        it('should return 201 status', async () => {
            const response = await request(app).post('/assets').send(input);
            expect(response.statusCode).toEqual(201);
            expect(response.body.data.length).toEqual(1);
            const asset: AssetResponse = response.body.data[0];
            assetId = asset.asset_id;
            expect(asset.name).toEqual(name)
            expect(asset.description).toEqual(description);
        });

        it('should return with all asset', async () => {
            const response = await request(app).get('/assets');
            expect(response.statusCode).toEqual(200);
            expect(response.body.data.length).toBeGreaterThan(1);

            const asset: AssetResponse = response.body.data[0];
            assetId = asset.asset_id;
            expect(asset.name).toEqual(name)
            expect(asset.description).toEqual(description);
        });

        it('should return specific asset', async () => {
            const response = await request(app).get('/assets/' + assetId);
            expect(response.statusCode).toEqual(200);
            expect(response.body.data.length).toEqual(1);
            const asset: AssetResponse = response.body.data[0];
            assetId = asset.asset_id;
            expect(asset.name).toEqual(name)
            expect(asset.description).toEqual(description);
        });

        it('should return Bad request with validation message', async () => {
            const response = await request(app).get('/assets/ab');
            const body = response.body;
            expect(response.statusCode).toEqual(400);
            expect(body.error[0].message).toEqual('"uuid" must be a valid GUID')
            expect(body.data.length).toEqual(0)
        });

        it('should delete the asset', async () => {
            const response = await request(app).delete('/assets/' + assetId);
            expect(response.statusCode).toEqual(204);
        });

        it('should send Not Found on delete', async () => {
            const response = await request(app).delete('/assets/' + assetId);
            const body = response.body;
            expect(response.statusCode).toEqual(404);
            expect(body.error).toEqual("Not Found");
            expect(body.data.length).toEqual(0);
        });

    })
    afterAll(async () => {
        await client.end();
    })
});
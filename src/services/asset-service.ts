import { AssetRequest, AssetResponse } from "src/models/Asset-model";
import { getDbInstance } from "../../getDbClient";

export class AssetService {
    constructor(){

    }

    async getClient(){
        return await getDbInstance();
    }

    async createAsset(params: AssetRequest & { fileType: number }): Promise<AssetResponse> {
        const client = await this.getClient();
        const text = `
        INSERT INTO ASSET(NAME, DESCRIPTION, FILE_TYPE, CREATED_ON, ISACTIVE)
        VALUES($1, $2, $3, $4, $5) RETURNING *
        `
        const values = [params.name, params.description, params.fileType, new Date().toISOString(), 1];
        const res = await client.query(text, values);
        return res.rows[0]
    }

    async getAsset(uuid: string): Promise<AssetResponse | null> {
        const client = await this.getClient();
        const text = `SELECT * FROM ASSET WHERE ASSET_ID = $1;`
        const res = await client.query(text, [uuid]);
        if(res.rows.length == 0){
            return null;
        }
        return res.rows[0];
    }

    async getAssets(): Promise<AssetResponse[]> {
        const text = ` SELECT * FROM ASSET`;
        const client = await this.getClient();
        const res = await client.query(text);
        return <AssetResponse[]>res.rows;
    }

    async deleteAsset(uuid: string): Promise<boolean> {
        const text = `DELETE FROM ASSET WHERE ASSET_ID = $1`;
        const client = await this.getClient();
        const res = await client.query(text, [uuid]);
        return !!res.rowCount;
    }
}

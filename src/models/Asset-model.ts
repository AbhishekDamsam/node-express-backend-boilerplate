
export interface Id {
    asset_id: string;
}

export interface AssetRequest {
    name: string;
    description?: string;
}

export interface AssetResponse extends Id, AssetRequest {
    fileType: string;
    createdOn: Date;
    isActive: boolean;
}
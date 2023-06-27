export type Asset = {
	id: string;
	symbol: string;
	price: string;
};

export type WalletAsset = {
	id: string;
	wallet_id: string;
	asset_id: string;
	shares: string;
	Asset: Asset;
};

export enum OrderStatus {
	PENDING,
	OPEN,
	CLOSED,
	FAILED
}

export enum OrderType {
	BUY,
	SELL
}

export type Order = {
	id: string;
	wallet_id: string;
	asset_id: string;
	shares: string;
	partial: string;
	price: string;
	type: OrderType;
	created_at: string;
	updated_at: string;
	status: OrderStatus;
	Asset: Pick<Asset, 'id' | 'symbol'>;
};

export type AssetDaily = {
	id: string;
	asset_id: string;
	date: string;
	price: number;
};
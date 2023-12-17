export type TProduct = {
	id: number;
	img: string;
	model: string;
	manufacturer: string;
	releaseYear: string;
	screenDiagonal: string;
	manufacturerCountry: string;
	memory: string;
	screenRefreshRate: string;
	NFC: boolean;
	ESIMSupport: boolean;
	wirelessChargingSupport: boolean;
	price: string;
};

export type TCharacteristic = {
	[key: string]: string[] | boolean[];
};

export type TSVGProps = {
	fill?: string;
	width?: string;
	height?: string;
};

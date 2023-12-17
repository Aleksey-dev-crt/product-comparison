import { TProduct } from '../types';

type ApiConfig = {
	baseUrl: string;
	headers: any;
};

export class Api {
	_baseurl;
	_headers;
	constructor({ baseUrl, headers }: ApiConfig) {
		this._baseurl = baseUrl;
		this._headers = headers;
	}

	_onResponse<T>(res: Response): Promise<T> {
		return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
	}

	getProductsWithLimit(limit: number) {
		return fetch(`${this._baseurl}/products?_limit=${limit}`, {
			headers: this._headers,
		}).then(this._onResponse<TProduct[]>);
	}

	getProductsWithSearch({search, exceptions}: {search: string, exceptions: string}) {
		return fetch(`${this._baseurl}/products?model_like=${search}&${exceptions}`, {
			headers: this._headers,
		}).then(this._onResponse<TProduct[]>);
	}
}

const api = new Api({
	baseUrl: 'http://localhost:3001',
	headers: {
		'content-type': 'application/json',
	},
});

export default api;

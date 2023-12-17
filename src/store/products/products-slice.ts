import {
	SerializedError,
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from '../types';
import { TCharacteristic, TProduct } from '../../types';
import api from '../../utils/api';
import { CHARACTERISITC_TITLES } from '../../utils/constants';

type TProductsState = {
	products: TProduct[];
	searchedProducts: TProduct[];
	exceptions: string;
	characteristics: [string, string[] | boolean[]][];
	loadingProducts: boolean;
	loadingSearch: boolean;
	errorProducts: SerializedError | null | unknown;
	errorSearch: SerializedError | null | unknown;
};

const initialState: TProductsState = {
	products: [],
	searchedProducts: [],
	exceptions: '',
	characteristics: [],
	loadingProducts: true,
	loadingSearch: true,
	errorProducts: null,
	errorSearch: null,
};

export const sliceName = 'products';

export const fetchProducts = createAsyncThunk<TProduct[], number>(
	`${sliceName}/fetchProducts`,
	async function (limit, { fulfillWithValue, rejectWithValue }) {
		try {
			const data = await api.getProductsWithLimit(limit);
			return fulfillWithValue([...data]);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const fetchProductsWithSearch = createAsyncThunk<
	TProduct[],
	{ search: string; exceptions: string }
>(
	`${sliceName}/fetchProductsWithSearch`,
	async function (
		{ search, exceptions },
		{ fulfillWithValue, rejectWithValue }
	) {
		try {
			const data = await api.getProductsWithSearch({ search, exceptions });
			return fulfillWithValue([...data]);
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

const productsSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		changeProduct: (state, action) => {
			state.products = state.products.map((el) =>
				el.id === action.payload.id ? { ...action.payload.product } : el
			);
		},

		fillCharacteristics: (state, action) => {
			state.characteristics = Object.keys(action.payload[0])
				.filter((char) => !['id', 'img', 'model'].includes(char))
				.map((char) => [
					CHARACTERISITC_TITLES[char],
					action.payload.map((arr: TCharacteristic) => arr[char]),
				]);
		},

		filterCharacteristics: (state, action) => {
			state.characteristics = action.payload.filter(
				(el: any[][]) =>
					!el[1].every(
						(e: string | boolean, _: number, self: string[] | boolean[]) =>
							e === self[0]
					)
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loadingProducts = true;
				state.errorProducts = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.products = action.payload;
				state.loadingProducts = false;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.errorProducts = action.payload;
				state.loadingProducts = false;
			})

			.addCase(fetchProductsWithSearch.pending, (state) => {
				state.loadingSearch = true;
				state.errorSearch = null;
			})
			.addCase(fetchProductsWithSearch.fulfilled, (state, action) => {
				state.searchedProducts = action.payload;
				state.exceptions = state.products
					.map((el) => `id_ne=${el.id}`)
					.join('&');
				state.loadingSearch = false;
			})
			.addCase(fetchProductsWithSearch.rejected, (state, action) => {
				state.errorSearch = action.payload;
				state.loadingSearch = false;
			});
	},
});

export const selectProducts = (state: RootState) => state[sliceName];
export const { changeProduct, fillCharacteristics, filterCharacteristics } =
	productsSlice.actions;
export default productsSlice.reducer;


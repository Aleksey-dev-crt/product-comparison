export const MAX_PRODUCTS_IN_PAGE = 6
export const MIN_PRODUCTS_IN_PAGE = 2
export const DEFAULT_PRODUCTS_IN_PAGE = 3

export type TCHARACTERISITC_TITLES = {
	[key: string]: string;
};

export const CHARACTERISITC_TITLES: TCHARACTERISITC_TITLES = {
  manufacturer: 'производитель',
  releaseYear: 'год релиза',
  screenDiagonal: 'диагональ экрана (дюйм)',
  manufacturerCountry: 'страна-производитель',
  memory: 'объем памяти',
  screenRefreshRate: 'частота обновления экрана',
  NFC: 'nfc',
  ESIMSupport: 'поддержка esim',
  wirelessChargingSupport: 'поддержка безпроводной зарядки',
  price: 'стоимость',
};
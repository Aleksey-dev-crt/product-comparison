import { useState, ChangeEvent, useEffect } from 'react';
import FilterProducts from '../UI/FilterProducts/FilterProducts';
import Checkbox from '../UI/Checkbox/Checkbox';
import ProductList from '../ProductList/ProductList';
import styles from './ProductsSection.module.css';
import {
	fetchProducts,
	fillCharacteristics,
	filterCharacteristics,
	selectProducts,
} from '../../store/products/products-slice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
	DEFAULT_PRODUCTS_IN_PAGE,
	MAX_PRODUCTS_IN_PAGE,
	MIN_PRODUCTS_IN_PAGE,
} from '../../utils/constants';

function ProductsSection() {
	const dispatch = useAppDispatch();
	const { products, characteristics } = useAppSelector(selectProducts);
	const [limit, setLimit] = useState(DEFAULT_PRODUCTS_IN_PAGE);

	useEffect(() => {
		dispatch(fetchProducts(limit));
	}, [dispatch, limit]);

	const handleFilter = (e: ChangeEvent<HTMLInputElement>) =>
		setLimit(+e.target.value);

	const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		e.target.checked
			? dispatch(filterCharacteristics(characteristics))
			: dispatch(fillCharacteristics(products));
	};

	return (
		<section className={styles.container}>
			<div className={styles.headingContainer}>
				<h1 className={styles.title}>Смартфоны</h1>
				<FilterProducts
					label='Отобразить&nbsp;товары:'
					start={MIN_PRODUCTS_IN_PAGE}
					end={MAX_PRODUCTS_IN_PAGE}
					current={limit}
					onChange={handleFilter}
				/>
			</div>
			<div className={styles.productsContainer}>
				<Checkbox onChange={handleCheckbox} label='Показать&nbsp;различия' />
				<ProductList products={products} />
			</div>
		</section>
	);
}

export default ProductsSection;


import {
	useState,
	useEffect,
	useRef,
	MutableRefObject,
	ChangeEvent,
} from 'react';
import Chevron from '../UI/Chevron/Chevron';
import styles from './Dropdown.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import {
	fetchProductsWithSearch,
	selectProducts,
	changeProduct,
} from '../../store/products/products-slice';
import ChangeIcon from '../UI/ChangeIcon/ChangeIcon';
import { TProduct } from '../../types';

function Dropdown({ id }: { id: number; }) {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const menuRef = useRef() as MutableRefObject<HTMLDivElement>;
	const dispatch = useAppDispatch();
	const { searchedProducts, exceptions } = useAppSelector(selectProducts);

	useEffect(() => {
		if (!open) return;
		dispatch(fetchProductsWithSearch({ search, exceptions }));
	}, [dispatch, exceptions, open, search]);

	useEffect(() => {
		const closeDropdown = (e: Event) => {
			const target = e.target as HTMLElement;
			if (!menuRef.current.contains(target)) {
				setSearch('');
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', closeDropdown);
		return () => document.removeEventListener('mousedown', closeDropdown);
	}, []);

	const openDropdown = () => setOpen(true);

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleChangeProduct = (product: TProduct) => {
		dispatch(changeProduct({ id, product }));
	};

	return (
		<div className={styles.container}>
			<button
				onClick={openDropdown}
				className={styles.dropDownButton}
				type='button'>
				<Chevron />
			</button>
			<div
				ref={menuRef}
				className={
					open
						? `${styles.menu} ${styles.active}`
						: `${styles.menu} ${styles.inactive}`
				}>
				{searchedProducts.length > 3 && (
					<input
						type='text'
						id={`search-${id}`}
						onChange={handleSearch}
						placeholder='Поиск'
						value={search}
						className={styles.search}
					/>
				)}
				<ul className={styles.products}>
					{searchedProducts.length ? (
						searchedProducts.map((product) => (
							<li key={product.id} className={styles.listItem}>
								<button
									type='button'
									onClick={() => handleChangeProduct(product)}
									className={styles.changeButton}>
									{<ChangeIcon />}
								</button>
								<img
									src={product.img}
									alt={product.model}
									className={styles.productImage}
								/>
								<p className={styles.model}>{product.model}</p>
							</li>
						))
					) : (
						<p className={styles.notFound}>
							К сожалению по вашему запросу ничего не найдено
						</p>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Dropdown;


import { TProduct } from '../../types';
import styles from './ProductList.module.css';
import Dropdown from '../Dropdown/Dropdown';

type TProductList = {
	products: TProduct[];
};

function ProductList({ products }: TProductList) {

	return (
		<ul className={styles.container}>
			{products.map((product) => (
				<li key={product.id} className={styles.listItem}>
					<div className={styles.product}>
						<img src={product.img} alt={product.model} />
						<p className={styles.model}>{product.model}</p>
					</div>					
					{products.length < 6 && <Dropdown id={product.id} />}
				</li>
			))}
		</ul>
	);
}

export default ProductList;


import { useEffect } from 'react';
import styles from './CharacteristicSection.module.css';
import {
	fillCharacteristics,
	selectProducts,
} from '../../store/products/products-slice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import SuccessIcon from '../UI/SuccessIcon/SuccessIcon';
import UnsuccessIcon from '../UI/UnsuccessIcon/UnsuccessIcon';

function CharacteristicSection() {
	const dispatch = useAppDispatch();
	const { products, characteristics } = useAppSelector(selectProducts);

	useEffect(() => {
		if (products.length) dispatch(fillCharacteristics(products));
	}, [dispatch, products]);

	return (
		<section className={styles.container}>
			{characteristics.map(([title, products]) => (
				<div key={title} className={styles.characteristic}>
					<h3 className={styles.title}>{title}</h3>
					<ul className={styles.products}>
						{products.map((product, i) => {
							if (typeof product === 'boolean')
								return (
									<li key={i} className={styles.listItem}>
										{product ? <SuccessIcon /> : <UnsuccessIcon />}
									</li>
								);
							if (title === 'стоимость')
								return (
									<li key={i} className={styles.listItem}>
										<p className={styles.text}>
											{new Intl.NumberFormat('ru-RU').format(+product)}
											&nbsp;&#8381;
										</p>
									</li>
								);
							return (
								<li key={i} className={styles.listItem}>
									<p className={styles.text}>{product}</p>
								</li>
							);
						})}
					</ul>
				</div>
			))}
		</section>
	);
}

export default CharacteristicSection;


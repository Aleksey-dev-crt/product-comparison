import { ChangeEvent } from 'react';
import styles from './FilterProducts.module.css';

type TPagination = {
	label: string,
  start: number,
  end: number,
  current: number,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

function FilterProducts({ label, start, end, current, onChange }: TPagination) {
	const range = Array.from({ length: end - start + 1 }, () => start++);
	
	return (
		<div className={styles.container}>
			<span className={styles.text}>{label}</span>
			{range.map((el) => (
				<div key={el} className={styles.radio + ' ' + styles.text}>
					<input
						id={`radio-${el}`}
						type='radio'
						checked={el === current}
						value={el}
						onChange={onChange}
					/>
					<label htmlFor={`radio-${el}`}>{el}</label>
				</div>
			))}
		</div>
	);
}

export default FilterProducts;


import { useId, ChangeEvent } from 'react';
import styles from './Checkbox.module.css';

type TCheckbox = {
	checked?: boolean,
	value?: string | number,
	disabled?: boolean,
	label?: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

function Checkbox({ checked, value, onChange, disabled, label }: TCheckbox) {
	const id = useId();
	return (
		<div className={styles.checkbox}>
			<input
				type="checkbox"
				id={`checkbox-${id}`}
				onChange={onChange}
				checked={checked}
				value={value}
				disabled={disabled}
			/>
			<label htmlFor={`checkbox-${id}`}>{label}</label>
		</div>
	);
}

export default Checkbox;


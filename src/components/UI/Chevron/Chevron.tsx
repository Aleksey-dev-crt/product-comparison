import { TSVGProps } from "../../../types";

function Chevron({ fill, width, height }: TSVGProps) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width || '30'}
			height={height || '27'}
			viewBox='0 0 30 27'
			fill='none'>
			<path
				d='M24.375 10.125L15 18.5625L5.625 10.125'
				stroke={fill || '#0D5ADC'}
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default Chevron;


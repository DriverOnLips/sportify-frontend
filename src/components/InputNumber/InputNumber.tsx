import React from 'react';
import { InputNumber as InputNumberAntd } from 'antd';

type Props = {
	value: string | number | null;
	onChange: (value: string | number | null) => void;
	defaultValue?: string | number;
	min?: string | number;
	max?: string | number;
	addonAfter?: React.ReactNode;
	addonBefore?: React.ReactNode;
};

const InputNumber: React.FC<Props> = ({
	value,
	onChange,
	defaultValue,
	min,
	max,
	addonAfter,
	addonBefore,
}) => (
	<InputNumberAntd
		value={value}
		onChange={onChange}
		defaultValue={defaultValue}
		min={min}
		max={max}
		addonAfter={addonAfter}
		addonBefore={addonBefore}
	/>
);

export default InputNumber;

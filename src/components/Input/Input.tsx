import React from 'react';
import { Input as AntInput } from 'antd';

type Props = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	children?: React.ReactNode;
};

const Input: React.FC<Props> = ({
	value,
	onChange,
	placeholder,
	className,
	disabled,
	children,
}) => (
	<AntInput
		value={value}
		onChange={onChange}
		placeholder={placeholder}
		className={className}
		disabled={disabled}
	>
		{children}
	</AntInput>
);

export default Input;

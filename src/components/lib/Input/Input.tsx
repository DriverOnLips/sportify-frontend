import React from 'react';
import { Input as AntInput } from 'antd';

type Props = {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	addonBefore?: React.ReactNode;
	enterButton?: React.ReactNode;
	children?: React.ReactNode;
};

const Input: React.FC<Props> = ({
	value,
	onChange,
	placeholder,
	className,
	disabled,
	addonBefore,
	children,
}) => (
	<AntInput
		value={value}
		onChange={onChange}
		placeholder={placeholder}
		className={className}
		disabled={disabled}
		addonBefore={addonBefore}
	>
		{children}
	</AntInput>
);

export default Input;

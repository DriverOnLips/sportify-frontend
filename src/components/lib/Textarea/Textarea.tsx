import React from 'react';
import { Input as AntInput } from 'antd';

const { TextArea } = AntInput;

type Props = {
	value?: string;
	rows?: number;
	maxLength?: number;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	addonBefore?: React.ReactNode;
	enterButton?: React.ReactNode;
	children?: React.ReactNode;
};

const Textarea: React.FC<Props> = ({
	value,
	rows,
	maxLength,
	onChange,
	placeholder,
	className,
	disabled,
	children,
}) => (
	<TextArea
		value={value}
		onChange={onChange}
		rows={rows}
		maxLength={maxLength}
		placeholder={placeholder}
		className={className}
		disabled={disabled}
	>
		{children}
	</TextArea>
);

export default Textarea;

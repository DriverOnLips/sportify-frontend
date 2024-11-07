import React from 'react';
import { Input as AntInput } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

const { Search: AntSearch } = AntInput;

type Props = {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onPressEnter?: () => void;
	onSearch?: () => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	size?: SizeType;
	addonBefore?: React.ReactNode;
	enterButton?: React.ReactNode;
	children?: React.ReactNode;
};

const Search: React.FC<Props> = ({
	value,
	onChange,
	onPressEnter,
	onSearch,
	placeholder,
	className,
	disabled,
	size,
	addonBefore,
	enterButton,
	children,
}) => (
	<AntSearch
		value={value}
		onChange={onChange}
		onPressEnter={onPressEnter}
		placeholder={placeholder}
		className={className}
		disabled={disabled}
		addonBefore={addonBefore}
		enterButton={enterButton}
		onSearch={onSearch}
		size={size}
	>
		{children}
	</AntSearch>
);

export default Search;

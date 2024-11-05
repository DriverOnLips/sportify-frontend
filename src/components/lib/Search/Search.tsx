import React from 'react';
import { Input as AntInput } from 'antd';

const { Search: AntSearch } = AntInput;

type Props = {
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onPressEnter?: () => void;
	onSearch?: () => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
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
	>
		{children}
	</AntSearch>
);

export default Search;

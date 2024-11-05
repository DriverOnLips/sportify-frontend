import React from 'react';
import { Select as AntdSelect } from 'antd';

type Option = {
	value: any;
	label: string;
};

type Props = {
	className?: string;
	value: any | null;
	options: Option[];
	placeholder?: string;
	mode?: 'multiple' | 'tags';
	allowClear?: boolean;
	onChange?: (value: any) => void;
	onSearch?: (value: string) => void;
};

const Select: React.FC<Props> = ({
	className,
	value,
	options,
	placeholder,
	mode,
	onChange,
	onSearch,
	allowClear,
}) => (
	<AntdSelect
		showSearch
		className={className}
		value={value}
		placeholder={placeholder}
		mode={mode}
		allowClear={allowClear}
		optionFilterProp={'label'}
		onChange={onChange}
		onSearch={onSearch}
		options={options}
		style={{ minWidth: 150 }} //TODO: remove
	/>
);

export default Select;

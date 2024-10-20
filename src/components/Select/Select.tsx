import React from 'react';
import { Select as AntdSelect } from 'antd';
import { SportTypes } from '../../types/enums/SportTypes.ts';

type Option = {
	value: SportTypes | null;
	label: string;
};

type Props = {
	value: SportTypes | null;
	options: Option[];
	placeholder?: string;
	onChange?: (value: any) => void;
	onSearch?: (value: string) => void;
};

const Select: React.FC<Props> = ({
	value,
	options,
	placeholder,
	onChange,
	onSearch,
}) => (
	<AntdSelect
		showSearch
		value={value}
		placeholder={placeholder}
		optionFilterProp={'label'}
		onChange={onChange}
		onSearch={onSearch}
		options={options}
	/>
);

export default Select;

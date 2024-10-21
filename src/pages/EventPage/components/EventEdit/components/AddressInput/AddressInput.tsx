import Input from 'components/Input/Input.tsx';
import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const AddressInput: React.FC<Props> = ({ changeEventField }) => {
	const [value, setValue] = useState('');

	const updateAddress = useMemo(
		() =>
			debounce((value: string) => changeEventField({ address: value }), 500),
		[],
	);

	const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setValue(val);
		updateAddress(val);
	};

	return (
		<Input
			value={value}
			onChange={changeAddress}
		/>
	);
};

export default AddressInput;

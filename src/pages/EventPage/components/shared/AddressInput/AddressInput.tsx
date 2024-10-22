import Input from 'components/Input/Input.tsx';
import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	className?: string;
	value?: string;
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const AddressInput: React.FC<Props> = ({
	className,
	value,
	changeEventField,
}) => {
	const [address, setAddress] = useState<string>(value || '');

	const updateAddress = useMemo(
		() =>
			debounce((value: string) => changeEventField({ address: value }), 500),
		[],
	);

	const changeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setAddress(val);
		updateAddress(val);
	};

	return (
		<Input
			className={className}
			value={address}
			onChange={changeAddress}
		/>
	);
};

export default AddressInput;

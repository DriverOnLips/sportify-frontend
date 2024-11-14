import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';
import Textarea from 'components/lib/Textarea/Textarea.tsx';

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

	const changeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setAddress(val);
		updateAddress(val);
	};

	return (
		<Textarea
			placeholder='Введите адрес'
			className={className}
			value={address}
			onChange={changeAddress}
		/>
	);
};

export default AddressInput;

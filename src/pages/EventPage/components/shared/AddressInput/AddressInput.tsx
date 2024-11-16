import React, { useState } from 'react';
import {
	AddressSuggestions,
	DaDataSuggestion,
	DaDataAddress,
} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	className?: string;
	value?: string;
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const AddressInput: React.FC<Props> = ({ className, changeEventField }) => {
	const [address, setAddress] = useState<
		DaDataSuggestion<DaDataAddress> | undefined
	>(undefined);

	const handleChange = (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined,
	) => {
		if (suggestion) {
			const selectedAddress = suggestion.value;
			setAddress(suggestion);
			changeEventField({ address: selectedAddress });
		} else {
			setAddress(undefined);
		}
	};

	return (
		<div className={className}>
			<AddressSuggestions
				token={import.meta.env.VITE_DA_DATA_API_KEY || ''}
				value={address}
				onChange={handleChange}
				inputProps={{
					placeholder: 'Введите адрес',
				}}
			/>
		</div>
	);
};

export default AddressInput;

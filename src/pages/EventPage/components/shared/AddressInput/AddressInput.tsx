import React, { useState } from 'react';
import {
	AddressSuggestions,
	DaDataSuggestion,
	DaDataAddress,
} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useEnv } from 'contexts/EnvContext.tsx';

interface Props {
	className?: string;
	changeEventField: (field: { address: string }) => void;
}

const AddressInput: React.FC<Props> = ({ className, changeEventField }) => {
	const [address, setAddress] = useState<
		DaDataSuggestion<DaDataAddress> | undefined
	>(undefined);
	const [inputValue, setInputValue] = useState<string>('');

	const { daDataApiKey } = useEnv();

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (!value) {
			setAddress(undefined);
			changeEventField({ address: '' });
			return;
		}

		setInputValue(value);
		changeEventField({ address: value });
	};

	return (
		<div className={className}>
			<AddressSuggestions
				token={daDataApiKey}
				value={address}
				onChange={handleChange}
				inputProps={{
					placeholder: 'Введите адрес',
					value: inputValue,
					onChange: handleInputChange,
				}}
				filterLocations={[{ region: 'Москва' }, { region: 'Московская' }]}
			/>
		</div>
	);
};

export default AddressInput;

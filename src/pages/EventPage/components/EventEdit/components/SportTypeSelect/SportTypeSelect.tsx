import Select from 'components/Select/Select.tsx';
import React, { useMemo, useState } from 'react';
import { SportTypes } from 'types/enums/SportTypes.ts';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const SportsTypeSelect: React.FC<Props> = ({ changeEventField }) => {
	const [value, setValue] = useState<SportTypes | null>(null);

	const updateAddress = useMemo(
		() => (value: SportTypes) => changeEventField({ sportType: value }),
		[],
	);

	const changeAddress = (val: SportTypes | null) => {
		setValue(val);
		val && updateAddress(val);
	};

	return (
		<Select
			value={value}
			options={Object.values(SportTypes).map((type) => ({
				value: type,
				label: type.charAt(0).toUpperCase() + type.slice(1),
			}))}
			onChange={changeAddress}
		/>
	);
};

export default SportsTypeSelect;

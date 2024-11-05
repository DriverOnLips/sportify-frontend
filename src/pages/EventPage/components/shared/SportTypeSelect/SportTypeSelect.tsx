import Select from 'components/lib/Select/Select.tsx';
import React, { useMemo, useState } from 'react';
import { SportTypes } from 'types/enums/SportTypes.ts';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';
import {
	convertSportTypeToDisplayValue,
	convertDisplayValueToSportType,
} from 'utils/converSportTypes.ts';

type Props = {
	className?: string;
	value?: SportTypes | null;
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const SportsTypeSelect: React.FC<Props> = ({
	className,
	value,
	changeEventField,
}) => {
	const [sportType, setSportType] = useState<SportTypes | null>(value || null);

	const updateSportType = useMemo(
		() => (value: SportTypes) => changeEventField({ sportType: value }),
		[],
	);

	const handleChange = (val: string | null) => {
		const selectedType = val ? convertDisplayValueToSportType(val) : null;
		setSportType(selectedType);
		if (selectedType) {
			updateSportType(selectedType);
		}
	};

	return (
		<Select
			className={className}
			placeholder='Выберите вид спорта'
			value={sportType ? convertSportTypeToDisplayValue(sportType) : null}
			options={Object.values(SportTypes).map((type) => ({
				value: convertSportTypeToDisplayValue(type),
				label: convertSportTypeToDisplayValue(type),
			}))}
			onChange={handleChange}
		/>
	);
};

export default SportsTypeSelect;

import Select from '../../../../../components/Select/Select.tsx';
import React, { useMemo, useState } from 'react';
import { SportTypes } from '../../../../../types/enums/SportTypes.ts';
import { EventCreateModel } from '../../../../../types/types/Event/EventCreate.ts';

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

	const updateAddress = useMemo(
		() => (value: SportTypes) => changeEventField({ sportType: value }),
		[],
	);

	const changeAddress = (val: SportTypes | null) => {
		setSportType(val);
		val && updateAddress(val);
	};

	return (
		<Select
			className={className}
			value={sportType}
			options={Object.values(SportTypes).map((type) => ({
				value: type,
				label: type.charAt(0).toUpperCase() + type.slice(1),
			}))}
			onChange={changeAddress}
		/>
	);
};

export default SportsTypeSelect;

import InputNumber from 'components/InputNumber/InputNumber.tsx';
import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const CapacityInput: React.FC<Props> = ({ changeEventField }) => {
	const [value, setValue] = useState<number | null>(null);

	const updateCapacity = useMemo(
		() =>
			debounce(
				(value: number | undefined) => changeEventField({ capacity: value }),
				500,
			),
		[],
	);

	const changeCapacity = (value: string | number | null) => {
		setValue(Number(value) || null);
		updateCapacity(Number(value) || undefined);
	};

	return (
		<InputNumber
			value={value}
			onChange={changeCapacity}
			max={10000}
		/>
	);
};

export default CapacityInput;

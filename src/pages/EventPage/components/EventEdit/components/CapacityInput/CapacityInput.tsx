import InputNumber from 'components/InputNumber/InputNumber.tsx';
import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const CapacityInput: React.FC<Props> = ({ changeEventField }) => {
	const [value, setValue] = useState<number | null>(null);

	const updatePrice = useMemo(
		() =>
			debounce(
				(value: number | undefined) => changeEventField({ price: value }),
				500,
			),
		[],
	);

	const changePrice = (value: string | number | null) => {
		setValue(Number(value) || null);
		updatePrice(Number(value) || undefined);
	};

	return (
		<InputNumber
			value={value}
			onChange={changePrice}
			max={10000}
		/>
	);
};

export default CapacityInput;

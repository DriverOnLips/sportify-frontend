import InputNumber from '../../../../../components/InputNumber/InputNumber.tsx';
import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EventCreateModel } from '../../../../../types/types/Event/EventCreate.ts';

type Props = {
	className?: string;
	value?: number;
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const PriceInput: React.FC<Props> = ({
	className,
	value,
	changeEventField,
}) => {
	const [price, setPrice] = useState(value || 0);

	const updatePrice = useMemo(
		() => debounce((value: number) => changeEventField({ price: value }), 500),
		[],
	);

	const changePrice = (value: string | number | null) => {
		if (typeof value !== 'number') {
			return;
		}

		setPrice(value);
		updatePrice(value);
	};

	return (
		<InputNumber
			className={className}
			value={price}
			onChange={changePrice}
			defaultValue={0}
			min={0}
			max={10000}
			addonAfter={'₽'}
		/>
	);
};

export default PriceInput;

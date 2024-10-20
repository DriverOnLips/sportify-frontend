import InputNumber from 'components/InputNumber/InputNumber.tsx';
import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EventInfoModel } from 'types/types/Event/EventInfo.ts';

type Props = {
	changeEventField: (field: Partial<EventInfoModel>) => void;
};

const PriceInput: React.FC<Props> = ({ changeEventField }) => {
	const [value, setValue] = useState(0);

	const updatePrice = useMemo(
		() => debounce((value: number) => changeEventField({ price: value }), 500),
		[],
	);

	const changePrice = (value: string | number | null) => {
		if (typeof value !== 'number') {
			return;
		}

		setValue(value);
		updatePrice(value);
	};

	return (
		<InputNumber
			value={value}
			onChange={changePrice}
			defaultValue={0}
			min={0}
			max={10000}
			addonAfter={'₽'}
		/>
	);
};

export default PriceInput;

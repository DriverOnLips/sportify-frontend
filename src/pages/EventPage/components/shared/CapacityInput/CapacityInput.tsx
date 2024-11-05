import InputNumber from 'components/lib/InputNumber/InputNumber.tsx';
import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	className?: string;
	value?: number;
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const CapacityInput: React.FC<Props> = ({
	className,
	value,
	changeEventField,
}) => {
	const [capacity, setCapacity] = useState<number | null>(value || null);

	const updateCapacity = useMemo(
		() =>
			debounce(
				(value: number | undefined) => changeEventField({ capacity: value }),
				500,
			),
		[],
	);

	const changeCapacity = (value: string | number | null) => {
		setCapacity(Number(value) || null);
		updateCapacity(Number(value) || undefined);
	};

	return (
		<InputNumber
			className={className}
			value={capacity}
			onChange={changeCapacity}
			max={10000}
		/>
	);
};

export default CapacityInput;

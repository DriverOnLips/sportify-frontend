import React, { useMemo, useState } from 'react';
import DatePicker from 'components/DatePicker/DatePicker.tsx';
import { formatDateYYYYMMDD } from 'utils/formatTime.ts';
import dayjs from 'dayjs';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	className?: string;
	value?: string;
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const EventDatePicker: React.FC<Props> = ({
	className,
	value,
	changeEventField,
}) => {
	const [date, setDate] = useState<string | null>(value || null);

	const updateDate = useMemo(
		() => (value: string | null) =>
			changeEventField({
				date: value ? new Date(value).toISOString() : undefined,
			}),
		[],
	);

	const changeDate = (date: dayjs.Dayjs, _: string | string[]) => {
		if (!date) {
			setDate(date);
			updateDate(date);

			return;
		}

		const val = formatDateYYYYMMDD(date);
		setDate(val);
		updateDate(val);
	};

	return (
		<DatePicker
			className={className}
			value={date}
			onChange={changeDate}
		/>
	);
};

export default EventDatePicker;

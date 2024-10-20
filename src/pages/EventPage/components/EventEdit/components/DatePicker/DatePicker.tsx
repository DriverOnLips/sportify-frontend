import React, { useMemo, useState } from 'react';
import { EventInfoModel } from 'types/types/Event/EventInfo.ts';
import DatePicker from 'components/DatePicker/DatePicker.tsx';
import { formatDateYYYYMMDD } from 'utils/formatTime.ts';
import dayjs from 'dayjs';

type Props = {
	changeEventField: (field: Partial<EventInfoModel>) => void;
};

const EventDatePicker: React.FC<Props> = ({ changeEventField }) => {
	const [value, setValue] = useState<string | null>(null);

	const updateDate = useMemo(
		() => (value: string | null) => changeEventField({ date: value }),
		[],
	);

	const changeDate = (date: dayjs.Dayjs, _: string | string[]) => {
		if (!date) {
			setValue(date);
			updateDate(date);

			return;
		}

		const val = formatDateYYYYMMDD(date);
		setValue(val);
		updateDate(val);
	};

	return (
		<DatePicker
			value={value}
			onChange={changeDate}
		/>
	);
};

export default EventDatePicker;

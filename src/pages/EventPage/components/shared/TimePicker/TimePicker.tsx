import TimePicker from 'antd/es/time-picker';
import React, { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	className?: string;
	value?: [string, string | null];
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const EventTimePicker: React.FC<Props> = ({
	className,
	value,
	changeEventField,
}) => {
	const [timeRange, setTimeRange] = useState<[string | null, string | null]>(
		value || [null, null],
	);

	const updateTimeRange = useMemo(
		() => (startTime: string | null, endTime: string | null) => {
			changeEventField({
				startTime: startTime ? `${startTime}:00` : undefined,
				endTime: endTime ? `${endTime}:00` : undefined,
			});
		},
		[],
	);

	const onChangeRange = (
		dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
		_: [string, string],
	) => {
		if (!dates || !dates[0] || !dates[1]) {
			setTimeRange([null, null]);
			updateTimeRange(null, null);

			return;
		}

		const [startTime, endTime] = dates;

		const formattedStartTime = startTime.format('HH:mm');
		const formattedEndTime = endTime.format('HH:mm');

		setTimeRange([formattedStartTime, formattedEndTime]);

		updateTimeRange(formattedStartTime, formattedEndTime);
	};

	return (
		<TimePicker.RangePicker
			className={className}
			value={
				timeRange.map((time) => (time ? dayjs(time, 'HH:mm') : null)) as [
					dayjs.Dayjs | null,
					dayjs.Dayjs | null,
				]
			}
			onChange={onChangeRange}
			format='HH:mm'
			placeholder={['Время начала', 'Время окончания']}
		/>
	);
};

export default EventTimePicker;

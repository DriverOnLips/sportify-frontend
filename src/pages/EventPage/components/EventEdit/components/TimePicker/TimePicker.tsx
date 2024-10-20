import TimePicker from 'antd/es/time-picker'; // АнтДизайн RangePicker
import React, { useMemo, useState } from 'react';
import { EventInfoModel } from 'types/types/Event/EventInfo.ts';
import { formatTime } from 'utils/formatTime.ts';
import dayjs from 'dayjs';

type Props = {
	changeEventField: (field: Partial<EventInfoModel>) => void;
};

const EventTimePicker: React.FC<Props> = ({ changeEventField }) => {
	const [timeRange, setTimeRange] = useState<[string | null, string | null]>([
		null,
		null,
	]);

	const updateTimeRange = useMemo(
		() => (startTime: string | null, endTime: string | null) => {
			changeEventField({ startTime, endTime });
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
		const formattedStartTime = formatTime(startTime);
		const formattedEndTime = formatTime(endTime);

		setTimeRange([formattedStartTime, formattedEndTime]);
		updateTimeRange(formattedStartTime, formattedEndTime);
	};

	return (
		<TimePicker.RangePicker
			value={
				timeRange.map((time) => (time ? dayjs(time, 'HH:mm') : null)) as [
					dayjs.Dayjs | null,
					dayjs.Dayjs | null,
				]
			}
			onChange={onChangeRange}
			format='HH:mm' // Формат времени
		/>
	);
};

export default EventTimePicker;

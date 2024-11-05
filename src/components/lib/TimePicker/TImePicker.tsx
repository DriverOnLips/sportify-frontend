import React from 'react';
import type { TimePickerProps } from 'antd';
import { TimePicker as TimePickerAntd } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.locale('ru');
dayjs.extend(customParseFormat);

type Props = {
	value: string | null;
	onChange: TimePickerProps['onChange'];
};

const TimePicker: React.FC<Props> = ({ value, onChange }) => {
	const val = value ? dayjs(`${value}:00`, 'HH:mm:ss') : null;

	return (
		<TimePickerAntd
			value={val}
			onChange={onChange}
			format='HH:mm'
			defaultOpenValue={dayjs('00:00', 'HH:mm')}
		/>
	);
};

export default TimePicker;

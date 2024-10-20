import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker as DatePickerAntd } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.locale('ru');
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

type Props = {
	value: string | null;
	onChange: DatePickerProps['onChange'];
};
const DatePicker: React.FC<Props> = ({ value, onChange }) => {
	const val = value ? dayjs(value) : null;

	return (
		<DatePickerAntd
			value={val}
			onChange={onChange}
			format='DD.MM.YYYY'
		/>
	);
};

export default DatePicker;

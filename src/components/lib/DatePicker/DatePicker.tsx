import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker as DatePickerAntd } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'antd/es/date-picker/locale/ru_RU';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('ru');
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
	className?: string;
	value?: string | null;
	onChange?: DatePickerProps['onChange'];
};

const DatePicker: React.FC<Props> = ({ className, value, onChange }) => {
	const val = value ? dayjs(value).tz('Europe/Moscow', true) : null;

	const handleChange = (date: dayjs.Dayjs, dateString: string | string[]) => {
		if (onChange) {
			onChange(date?.tz('Europe/Moscow', true) || null, dateString);
		}
	};

	return (
		<DatePickerAntd
			className={`${className}`}
			value={val}
			onChange={handleChange}
			format='DD.MM.YYYY'
			locale={localeData}
			placeholder='Выберите дату'
		/>
	);
};

export default DatePicker;

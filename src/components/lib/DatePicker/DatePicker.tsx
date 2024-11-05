import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker as DatePickerAntd } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'antd/es/date-picker/locale/ru_RU';
import styles from './DatePicker.module.scss';

dayjs.locale('ru');
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

type Props = {
	className?: string;
	value: string | null;
	onChange: DatePickerProps['onChange'];
};

const DatePicker: React.FC<Props> = ({ className, value, onChange }) => {
	const val = value ? dayjs(value) : null;

	return (
		<DatePickerAntd
			className={`${className} ${styles.custom_datepicker}`}
			value={val}
			onChange={onChange}
			format='DD.MM.YYYY'
			locale={localeData}
			placeholder='Выберите дату'
		/>
	);
};

export default DatePicker;

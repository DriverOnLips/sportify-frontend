import dayjs, { Dayjs } from 'dayjs';
import useQueryParams from 'hooks/useQueryParams.ts';
import { SearchParams } from 'types/types/SearchParams/SearchParams.ts';
import { DatePicker, DatePickerProps } from 'antd';
import localeData from 'antd/es/date-picker/locale/ru_RU';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.locale('ru');
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

const HeaderDateFilter = () => {
	const { date, setQueryParam } = useQueryParams();

	const handleChange: DatePickerProps<Dayjs[]>['onChange'] = (
		_,
		dateString,
	) => {
		setQueryParam(SearchParams.date, dateString);
	};

	return (
		<DatePicker
			value={date.map((day) => dayjs(day))}
			onChange={handleChange}
			multiple={true}
			locale={localeData}
			placeholder='Выберите даты'
		/>
	);
};

export default HeaderDateFilter;

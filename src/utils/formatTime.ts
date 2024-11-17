import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('ru');
dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateDDMMMMYYYY = (
	time: Date | dayjs.Dayjs | string,
): string => {
	return dayjs(time).format('DD MMMM YYYY');
};

export const formatDateYYYYMMDD = (
	time: Date | dayjs.Dayjs | string,
): string => {
	return dayjs(time).tz('Europe/Moscow').format('YYYY-MM-DD');
};

export const formatTime = (time: Date | dayjs.Dayjs | string): string => {
	return dayjs(time).format('HH:mm:ss');
};

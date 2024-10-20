import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const formatDateDDMMMMYYYY = (
	time: Date | dayjs.Dayjs | string,
): string => {
	return dayjs(time).format('DD MMMM YYYY');
};

export const formatDateYYYYMMDD = (
	time: Date | dayjs.Dayjs | string,
): string => {
	return dayjs(time).format('YYYY-MM-DD');
};

export const formatTime = (time: Date | dayjs.Dayjs | string): string => {
	return dayjs(time).format('HH:mm');
};

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const formatDate = (time: Date | string): string => {
	return dayjs(time).format('DD MMMM YYYY');
};

export const formatTime = (time: Date | string): string => {
	return dayjs(time).format('HH:mm');
};

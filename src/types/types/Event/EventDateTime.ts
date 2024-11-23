export type EventCreateDateTimeModel = {
	date?: string;
	startTime?: string;
	endTime?: string;
};

export type EventDateTimeModel = {
	date: string;
	startTime: string;
	endTime: string;
};

export type EventDateTimeApi = {
	date: string;
	start_time: string;
	end_time: string;
};

export const createEventDateTimeApi = (
	from: EventCreateDateTimeModel,
): EventDateTimeApi => {
	if (!from || !checkDateTimeExist(from)) {
		throw new Error('Не все поля заполнены');
	}

	return {
		date: from.date!,
		start_time: from.startTime!,
		end_time: from.endTime!,
	};
};

export const createEventDateTimeModel = (
	from: EventDateTimeApi,
): EventDateTimeModel => {
	return {
		date: from.date,
		startTime: from.start_time,
		endTime: from.end_time,
	};
};

export const checkDateTimeExist = (
	dateTime: EventCreateDateTimeModel,
): boolean => {
	return !(!dateTime.date || !dateTime.startTime || !dateTime.endTime);
};

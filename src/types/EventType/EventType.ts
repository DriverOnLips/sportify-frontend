// тип для страницы с подробным описанием
export type EventTypeModel = {
	id: string;
	name: string;
	location: string;
};

export type EventTypeApi = {
	id: string;
	name: string;
	location: string;
};

export const normalizeEventType = (from: EventTypeApi): EventTypeModel => ({
	...from,
});

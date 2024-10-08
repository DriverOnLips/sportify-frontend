// тип для страницы со списком мероприятий
export type EventFromListModel = {
	id: string;
	name: string;
};

export type EventFromListApi = {
	id: string;
	name: string;
};

export const normalizeEventFromList = (
	from: EventFromListApi,
): EventFromListModel => ({
	...from,
});

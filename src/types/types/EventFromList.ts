import { EventTypeModel, EventTypeApi } from './EventType.ts';

// тип для страницы со списком мероприятий
export type EventFromListModel = Omit<
	EventTypeModel,
	'description' | 'rawMessage'
>;

export type EventFromListApi = Omit<
	EventTypeApi,
	'description' | 'raw_message'
>;

export const createEventFromListModel = (
	from: EventFromListApi,
): EventFromListModel => ({
	...from,
	sportType: from.sport_type,
	startTime: from.start_time,
	endTime: from.end_time,
	isFree: from.is_free,
	gameLevel: from.game_level,
	subscribersId: from.subscribers_id,
});

export const createEventFromListApi = (
	from: EventFromListModel,
): EventFromListApi => ({
	...from,
	sport_type: from.sportType,
	start_time: from.startTime,
	end_time: from.endTime,
	is_free: from.isFree,
	game_level: from.gameLevel,
	subscribers_id: from.subscribersId,
});

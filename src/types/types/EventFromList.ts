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
	from: EventFromListApi[],
): EventFromListModel[] => {
	return from.map((event) => ({
		...event,
		sportType: event.sport_type,
		startTime: event.start_time,
		endTime: event.end_time,
		isFree: event.is_free,
		gameLevel: event.game_level,
		subscribersId: event.subscribers_id,
	}));
};

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

import { EventInfoModel, EventInfoApi } from './EventInfo.ts';

// тип обновления мероприятия
export type EventUpdateModel = Omit<
	EventInfoModel,
	'isFree' | 'rawMessage' | 'busy' | 'subscribersId'
>;

export type EventUpdateApi = Omit<
	EventInfoApi,
	'id' | 'is_free' | 'raw_message' | 'busy' | 'subscribers_id'
>;

export const createEventUpdateApi = (
	from: EventUpdateModel,
): EventUpdateApi => ({
	...from,
	sport_type: from.sportType,
	start_time: from.startTime,
	end_time: from.endTime,
	game_level: from.gameLevel,
});

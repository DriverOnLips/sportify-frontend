import { EventInfoModel, EventInfoApi } from './EventInfo.ts';

// тип создания мероприятия
export type EventCreateModel = Omit<
	EventInfoModel,
	'id' | 'isFree' | 'rawMessage' | 'busy' | 'subscribersId'
>;

export type EventCreateApi = Omit<
	EventInfoApi,
	'id' | 'is_free' | 'raw_message' | 'busy' | 'subscribers_id'
>;

export const createEventCreateApi = (
	from: EventCreateModel,
): EventCreateApi => ({
	...from,
	sport_type: from.sportType,
	start_time: from.startTime,
	end_time: from.endTime,
	game_level: from.gameLevel,
	creator_id: from.creatorId,
});

import { EventInfoModel, EventInfoApi } from './EventInfo.ts';
import { createEventDateTimeApi } from './EventDateTime.ts';

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
	date_time: createEventDateTimeApi({
		date: from.date,
		startTime: from.startTime,
		endTime: from.endTime,
	}),
	game_level: from.gameLevel,
	creator_id: from.creatorId,
});

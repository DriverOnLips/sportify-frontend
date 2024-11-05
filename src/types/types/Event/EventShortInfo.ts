import { EventInfoModel, EventInfoApi } from './EventInfo.ts';

// тип для страницы со списком мероприятий
export type EventShortInfoModel = Omit<
	EventInfoModel,
	'description' | 'rawMessage'
>;

export type EventShortInfoApi = Omit<
	EventInfoApi,
	'description' | 'raw_message'
>;

export const createEventShortInfoModel = (
	from: EventShortInfoApi[],
): EventShortInfoModel[] => {
	return from.map((event) => ({
		...event,
		sportType: event.sport_type,
		startTime: event.start_time,
		endTime: event.end_time,
		isFree: event.is_free,
		gameLevel: event.game_level,
		subscribersId: event.subscribers_id,
		creatorId: event.creator_id,
	}));
};

import { EventInfoModel, EventInfoApi } from './EventInfo.ts';

// тип для страницы со списком мероприятий
export type EventShortInfoModel = Omit<
	EventInfoModel,
	'description' | 'rawMessage' | 'creator'
> & { creatorId: string };

export type EventShortInfoApi = Omit<
	EventInfoApi,
	'description' | 'raw_message' | 'creator'
> & { id: string };

export const createEventShortInfoModel = (
	from: EventShortInfoApi[],
): EventShortInfoModel[] => {
	return from.map((event) => ({
		...event,
		sportType: event.sport_type,
		date: event.date_time.date,
		startTime: event.date_time.start_time,
		endTime: event.date_time.end_time,
		isFree: event.is_free,
		gameLevel: event.game_level,
		subscribersId: event.subscribers_id,
		creatorId: event.id,
	}));
};

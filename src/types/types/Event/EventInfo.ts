import { GameLevels } from '../../enums/GameLevels.ts';
import { SportTypes } from '../../enums/SportTypes.ts';
import { EventDateTimeApi } from './EventDateTime.ts';

// тип для страницы с подробным описанием
export type EventInfoModel = {
	id: string;
	creatorId: string;
	sportType: SportTypes;
	address: string;
	date?: string;
	startTime?: string;
	endTime?: string;
	price: number;
	isFree: boolean;
	gameLevel: GameLevels[];
	description: string | null;
	capacity: number | null;
	busy: number;
	subscribersId: string[] | null;
	preview: string;
	photos: string[];
	latitude: string | null;
	longitude: string | null;
};

export type EventInfoApi = {
	id: string;
	creator_id: string;
	sport_type: SportTypes;
	address: string;
	date_time: EventDateTimeApi;
	price: number;
	is_free: boolean;
	game_level: GameLevels[];
	description: string | null;
	raw_message: string | null;
	capacity: number | null;
	busy: number;
	subscribers_id: string[] | null;
	preview: string;
	photos: string[];
	latitude: string | null;
	longitude: string | null;
};

export const createEventInfoModel = (from: EventInfoApi): EventInfoModel => ({
	...from,
	creatorId: from.creator_id,
	sportType: from.sport_type,
	date: from.date_time.date,
	startTime: from.date_time.start_time,
	endTime: from.date_time.end_time,
	isFree: from.is_free,
	gameLevel: from.game_level,
	subscribersId: from.subscribers_id,
});

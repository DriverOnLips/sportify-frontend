import { GameLevels } from '../../enums/GameLevels.ts';
import { SportTypes } from '../../enums/SportTypes.ts';

// тип для страницы с подробным описанием
export type EventInfoModel = {
	id: string;
	creatorId: string;
	sportType: SportTypes;
	address: string;
	date: string;
	startTime: string;
	endTime: string;
	price: number;
	isFree: boolean;
	gameLevel: GameLevels[];
	description: string | null;
	capacity: number | null;
	busy: number;
	subscribersId: string[] | null;
	preview: string;
	photos: string[];
};

export type EventInfoApi = {
	id: string;
	creator_id: string;
	sport_type: SportTypes;
	address: string;
	date: string;
	start_time: string;
	end_time: string | null;
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
};

export const createEventInfoModel = (from: EventInfoApi): EventInfoModel => ({
	...from,
	creatorId: from.creator_id,
	sportType: from.sport_type,
	startTime: from.start_time,
	endTime: from.end_time || new Date().toISOString(), // TODO: remove
	isFree: from.is_free,
	gameLevel: from.game_level,
	subscribersId: from.subscribers_id,
});

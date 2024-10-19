import { GameLevels } from '../../enums/GameLevels.ts';
import { SportTypes } from '../../enums/SportTypes.ts';

// тип для страницы с подробным описанием
export type EventInfoModel = {
	id: string;
	sportType: SportTypes;
	address: string;
	date: string;
	startTime: string;
	endTime: string | null;
	price: number | null;
	isFree: boolean;
	gameLevel: GameLevels | null;
	description: string | null;
	rawMessage: string | null;
	capacity: number | null;
	busy: number;
	subscribersId: string[] | null;
	preview: string;
	photos: string[];
};

export type EventInfoApi = {
	id: string;
	sport_type: SportTypes;
	address: string;
	date: string;
	start_time: string;
	end_time: string | null;
	price: number | null;
	is_free: boolean;
	game_level: GameLevels | null;
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
	sportType: from.sport_type,
	startTime: from.start_time,
	endTime: from.end_time,
	isFree: from.is_free,
	gameLevel: from.game_level,
	rawMessage: from.raw_message,
	subscribersId: from.subscribers_id,
});

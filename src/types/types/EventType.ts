import { SportTypes } from '../enums/SportTypes.ts';
import { GameLevels } from '../enums/GameLevels.ts';

// тип для страницы с подробным описанием
export type EventTypeModel = {
	id: string;
	sportType: SportTypes;
	address: string;
	date: string;
	startTime: string;
	endTime: string | null;
	price: number | null;
	isFree: boolean;
	gameLevel: GameLevels[] | null;
	description: string | null;
	rawMessage: string | null;
	capacity: number | null;
	busy: number;
	subscribersId: string[] | null;
	preview: string;
	photos: string[];
};

export type EventTypeApi = {
	id: string;
	sport_type: SportTypes;
	address: string;
	date: string;
	start_time: string;
	end_time: string | null;
	price: number | null;
	is_free: boolean;
	game_level: GameLevels[] | null;
	description: string | null;
	raw_message: string | null;
	capacity: number | null;
	busy: number;
	subscribers_id: string[] | null;
	preview: string;
	photos: string[];
};

export const createEventTypeModel = (from: EventTypeApi): EventTypeModel => ({
	...from,
	sportType: from.sport_type,
	startTime: from.start_time,
	endTime: from.end_time,
	isFree: from.is_free,
	gameLevel: from.game_level,
	rawMessage: from.raw_message,
	subscribersId: from.subscribers_id,
});

export const createEventTypeApi = (from: EventTypeModel): EventTypeApi => ({
	...from,
	sport_type: from.sportType,
	start_time: from.startTime,
	end_time: from.endTime,
	is_free: from.isFree,
	game_level: from.gameLevel,
	raw_message: from.rawMessage,
	subscribers_id: from.subscribersId,
});

import { GameLevels } from '../../enums/GameLevels.ts';
import { SportTypes } from '../../enums/SportTypes.ts';
import { createEventDateTimeApi, EventDateTimeApi } from './EventDateTime.ts';

// тип создания мероприятия
export type EventCreateModel = {
	sportType?: SportTypes;
	address?: string;
	date?: string;
	startTime?: string;
	endTime?: string;
	price?: number;
	gameLevel?: GameLevels[];
	description?: string | null;
	capacity?: number | null;
	preview?: string;
	photos?: string[];
};

export type EventCreateApi = {
	sport_type: SportTypes;
	address: string;
	date_time: EventDateTimeApi;
	price: number;
	game_level: GameLevels[];
	description: string | null;
	capacity: number | null;
	preview: string | null;
	photos: string[];
};

export const createEventCreateApi = (
	from: EventCreateModel,
): EventCreateApi => {
	if (
		!from.sportType ||
		!from.address ||
		from.address === '' ||
		!from.date ||
		!from.startTime ||
		!from.endTime
	) {
		throw new Error('Не все поля заполнены');
	}

	return {
		sport_type: from.sportType,
		address: from.address,
		date_time: createEventDateTimeApi({
			date: from.date,
			startTime: from.startTime,
			endTime: from.endTime,
		}),
		price: from.price || 0,
		game_level: from.gameLevel || [],
		description: from.description || null,
		capacity: from.capacity || null,
		preview: from.preview || null,
		photos: from.photos || [],
	};
};

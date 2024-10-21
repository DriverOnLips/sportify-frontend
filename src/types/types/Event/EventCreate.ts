import { GameLevels } from '../../enums/GameLevels.ts';
import { SportTypes } from '../../enums/SportTypes.ts';

// тип создания мероприятия
export type EventCreateModel = {
	sportType?: SportTypes;
	address?: string;
	date?: string;
	startTime?: string;
	endTime?: string | null;
	price?: number;
	gameLevel?: GameLevels | null;
	description?: string | null;
	capacity?: number | null;
	preview?: string;
	photos?: string[];
};

export type EventCreateApi = {
	sport_type: SportTypes;
	address: string;
	date: string;
	start_time: string;
	end_time: string | null;
	price: number | null;
	game_level: GameLevels | null;
	description: string | null;
	capacity: number | null;
	preview: string;
	photos: string[];
};

export const createEventCreateApi = (
	from: EventCreateModel,
): EventCreateApi => ({
	...from,
	sport_type: from.sportType,
	start_time: from.startTime,
	end_time: from.endTime,
	game_level: from.gameLevel,
});

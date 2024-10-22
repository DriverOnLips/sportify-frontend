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
	gameLevel?: GameLevels[];
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
	game_level: GameLevels[];
	description: string | null;
	capacity: number | null;
	preview: string;
	photos: string[];
};

export const createEventCreateApi = (
	from: EventCreateModel,
): EventCreateApi => {
	if (
		!from.sportType ||
		!from.address ||
		!from.date ||
		!from.startTime ||
		!from.preview ||
		!from.photos
	) {
		throw new Error('Не все поля заполнены');
	}

	const timeStart = new Date(from.date);
	const [startHours, startMinutes] = from.startTime.split(':').map(Number);
	timeStart.setUTCHours(startHours);
	timeStart.setUTCMinutes(startMinutes);

	const timeEnd = new Date(from.date);
	if (from.endTime) {
		const [endHours, endMinutes] = from.endTime.split(':').map(Number);
		timeEnd.setUTCHours(endHours);
		timeEnd.setUTCMinutes(endMinutes);
	}

	return {
		sport_type: from.sportType,
		address: from.address,
		date: from.date,
		start_time: timeStart.toISOString(),
		end_time: from.endTime ? timeEnd.toISOString() : null,
		price: from.price || null,
		game_level: from.gameLevel || [],
		description: from.description || null,
		capacity: from.capacity || null,
		preview: from.preview,
		photos: from.photos,
	};
};

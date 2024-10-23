import { GameLevels } from '../../enums/GameLevels.ts';
import { SportTypes } from '../../enums/SportTypes.ts';

export type EventFilterQueryParams = {
	sportType?: SportTypes[];
	gameLevel?: GameLevels[];
	dateStart?: string;
	priceMin?: number;
	priceMax?: number;
	address?: string;
	freePlaces?: number;
	orderBy?: 'game_level' | 'date_start' | 'price' | 'free_places';
	sortOrder?: 'asc' | 'desc';
};

export type EventFilterApi = {
	sport_type?: SportTypes[];
	game_level?: GameLevels[];
	date_start?: string;
	price_min?: number;
	price_max?: number;
	address?: string;
	free_places?: number;
	order_by?: 'game_level' | 'date_start' | 'price' | 'free_places';
	sort_order?: 'asc' | 'desc';
};

export const createEventFilterApiModel = (
	params: EventFilterQueryParams,
): EventFilterApi => {
	const now = new Date();
	const dateStart = params.dateStart ? new Date(params.dateStart) : null;

	return {
		sport_type: params.sportType,
		game_level: params.gameLevel,
		date_start:
			dateStart && dateStart > now ? dateStart.toISOString() : undefined,
		price_min: params.priceMin,
		price_max: params.priceMax,
		address: params.address || undefined,
		free_places: params.freePlaces,
		order_by: params.orderBy || 'date_start',
		sort_order: params.sortOrder || 'asc',
	};
};

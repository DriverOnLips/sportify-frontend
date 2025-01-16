import { GameLevels } from '../../enums/GameLevels.ts';
import { SportTypes } from '../../enums/SportTypes.ts';
import { EventDateTimeApi } from './EventDateTime.ts';
import {
	createUserShortInfoModel,
	UserShortInfoApi,
	UserShortInfoModel,
} from '../User/UserShortInfo.ts';

// тип для страницы с подробным описанием
export type EventInfoModel = {
	id: string;
	creator: UserShortInfoModel;
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
	creator: UserShortInfoApi;
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

// const defaultUser: UserShortInfoApi = {
// 	user_id: '1b00e670-cc4b-46a9-8334-34893b62acb9',
// 	username: 'asdf1',
// 	tg_url: 'https://t.me/Lucker285',
// };

export const createEventInfoModel = (from: EventInfoApi): EventInfoModel => ({
	...from,
	creator: createUserShortInfoModel(from.creator),
	// creator: createUserShortInfoModel(defaultUser),
	sportType: from.sport_type,
	date: from.date_time.date,
	startTime: from.date_time.start_time,
	endTime: from.date_time.end_time,
	isFree: from.is_free,
	gameLevel: from.game_level,
	subscribersId: from.subscribers_id,
});

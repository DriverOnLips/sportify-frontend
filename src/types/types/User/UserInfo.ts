import { SportTypes } from '../../enums/SportTypes.ts';

export type UserInfoModel = {
	id: string;
	username: string;
	firstName?: string;
	secondName?: string;
	sportTypes: SportTypes[];
	avatar?: string;
	description?: string;
	tgUrl?: string;
};

export type UserInfoApi = {
	user_id: string;
	username: string;
	first_name?: string;
	second_name?: string;
	sport_types: SportTypes[];
	photo_url?: string;
	description?: string;
};

export const createUserInfoModel = (from: UserInfoApi): UserInfoModel => ({
	id: from.user_id,
	firstName: from.first_name,
	secondName: from.second_name,
	sportTypes: from.sport_types,
	tgUrl: from.photo_url,
	...from,
});

export const createUserInfoApi = (from: UserInfoModel): UserInfoApi => ({
	user_id: from.id,
	username: from.username,
	first_name: from.firstName,
	second_name: from.secondName,
	sport_types: from.sportTypes,
	photo_url: from.avatar,
	description: from.description,
});

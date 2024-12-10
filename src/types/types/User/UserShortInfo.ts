export type UserShortInfoModel = {
	id: string;
	username: string;
	avatar?: string;
	tgUrl?: string;
};

export type UserShortInfoApi = {
	creator_id: string;
	username: string;
	photo_url?: string;
	tg_url?: string;
};

export const createUserShortInfoModel = (
	from: UserShortInfoApi,
): UserShortInfoModel => ({
	id: from.creator_id,
	username: from.username,
	avatar: from.photo_url,
	tgUrl: from.tg_url,
});

export const createShortUserInfoApi = (
	from: UserShortInfoModel,
): UserShortInfoApi => ({
	creator_id: from.id,
	username: from.username,
	photo_url: from.avatar,
	tg_url: from.tgUrl,
});

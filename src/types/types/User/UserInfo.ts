export type UserInfoModel = {
	id: string;
	username: string;
};

export type UserInfoApi = {
	user_id: string;
	username: string;
};

export const createUserInfoModel = (from: UserInfoApi): UserInfoModel => ({
	id: from.user_id,
	username: from.username,
});

export const createUserInfoApi = (from: UserInfoModel): UserInfoApi => ({
	user_id: from.id,
	username: from.username,
});

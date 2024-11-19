export type UserWithPwModel = {
	username?: string;
	password?: string;
};

export type UserWithPwApi = {
	user: string;
	passwd: string;
};

export const createUserWithPwApi = (from: UserWithPwModel): UserWithPwApi => {
	if (!from.username || !from.password) {
		throw new Error('Не все поля заполнены');
	}

	return {
		user: from.username,
		passwd: from.password,
	};
};

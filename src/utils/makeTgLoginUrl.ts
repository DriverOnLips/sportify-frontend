import { AuthTgToken } from '../types/types/Authorization/Authorization.ts';

export const makeTgLoginUrl = (data: AuthTgToken) => {
	return `https://t.me/${data.bot}/?start=${data.token}`;
};

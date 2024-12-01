import { RequestMethods, ServiceBase } from '../ServiceBase.ts';
import {
	createUserWithPwApi,
	UserWithPwModel,
} from '../../types/types/User/UserWithPw.ts';
import {
	createUserInfoModel,
	UserInfoModel,
} from 'types/types/User/UserInfo.ts';
import { AuthTgToken } from '../../types/types/Authorization/Authorization.ts';

export class AuthService extends ServiceBase {
	private static instance: AuthService;

	constructor() {
		super();
		if (AuthService.instance) {
			return AuthService.instance;
		}

		AuthService.instance = this;
		this.config = [
			{
				name: 'register',
				url: `/api/auth/register`,
				method: RequestMethods.POST,
			},
			{
				name: 'login',
				url: `/api/auth/my/login `,
				method: RequestMethods.POST,
			},
			{
				name: 'logout',
				url: `/api/auth/logout`,
				method: RequestMethods.POST,
			},
			{ name: 'check', url: `/api/auth/check`, method: RequestMethods.GET },
			{
				name: 'getTgToken',
				url: `/api/auth/telegram/login`,
				method: RequestMethods.GET,
			},
			{
				name: 'tgLogin',
				url: `/api/auth/telegram/login`,
				method: RequestMethods.GET,
			},
		];
	}

	async register(user: UserWithPwModel): Promise<UserInfoModel> {
		try {
			const configItem = this.getConfigItem('register');

			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
				createUserWithPwApi(user),
			);

			return createUserInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async login(user: UserWithPwModel): Promise<UserInfoModel> {
		try {
			const configItem = this.getConfigItem('login');

			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
				createUserWithPwApi(user),
			);

			return createUserInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async logout(): Promise<void> {
		try {
			const configItem = this.getConfigItem('logout');

			return await this.makeHttpRequest(configItem.method, configItem.url);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async check(): Promise<UserInfoModel> {
		try {
			const configItem = this.getConfigItem('check');

			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
			);

			return createUserInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getTgToken(): Promise<AuthTgToken> {
		try {
			const configItem = this.getConfigItem('getTgToken');

			return await this.makeHttpRequest(configItem.method, configItem.url);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async tgLogin(token: string): Promise<UserInfoModel> {
		try {
			const configItem = this.getConfigItem('tgLogin');

			const response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}?token=${token}`,
			);
			return createUserInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

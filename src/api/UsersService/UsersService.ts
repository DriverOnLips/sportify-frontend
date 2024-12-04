import { RequestMethods, ServiceBase } from '../ServiceBase.ts';
import {
	createUserInfoApi,
	createUserInfoModel,
	UserInfoModel,
} from 'types/types/User/UserInfo.ts';

export class UsersService extends ServiceBase {
	private static instance: UsersService;

	constructor() {
		super();
		if (UsersService.instance) {
			return UsersService.instance;
		}

		UsersService.instance = this;
		this.config = [
			{ name: 'getUserInfo', url: `/api/profiles`, method: RequestMethods.GET },
			{
				name: 'updateUserInfo',
				url: `/api/profiles`,
				method: RequestMethods.PUT,
			},
		];
	}

	async getUserInfo(id: string): Promise<UserInfoModel> {
		try {
			const configItem = this.getConfigItem('getUserInfo');

			const response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}/${id}`,
			);

			return createUserInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async updateUserInfo(user: UserInfoModel): Promise<void> {
		try {
			const configItem = this.getConfigItem('updateUserInfo');

			return await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}/${user.id}`,
				createUserInfoApi(user),
				{
					'Content-Type': 'application/json',
				},
			);
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

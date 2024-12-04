import { RequestMethods, ServiceBase } from '../ServiceBase.ts';
import {
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
}

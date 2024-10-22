import { RequestMethods, ServiceBase } from '../ServiceBase.ts';

export class ImageService extends ServiceBase {
	private static instance: ImageService;

	constructor() {
		super();
		if (ImageService.instance) {
			return ImageService.instance;
		}

		ImageService.instance = this;
		this.config = [
			{ name: 'uploadImage', url: `/api/upload`, method: RequestMethods.POST },
		];
	}

	async uploadImage(base64: string): Promise<any> {
		try {
			const configItem = this.getConfigItem('uploadImage');

			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
				base64,
				{
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			);

			return response.url;
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

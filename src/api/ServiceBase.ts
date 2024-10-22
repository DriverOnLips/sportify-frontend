import axios from 'axios';

export enum RequestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type ConfigType = {
	name: string;
	url: string;
	method: RequestMethods;
};

export abstract class ServiceBase {
	protected pendingRequests: { [key: string]: boolean } = {};
	protected config: ConfigType[] = [];

	protected getConfigItem(name: string): ConfigType {
		const configItem = this.config.find((item) => item.name === name);

		if (!configItem) {
			throw new Error(`Не найдена конфигурация для ${name}`);
		}

		return configItem;
	}

	protected async makeHttpRequest(
		method: RequestMethods,
		url: string,
		data?: any,
		headers?: any,
	): Promise<any> {
		// Если запрос уже в процессе, игнорируем новый запрос
		if (this.pendingRequests[url]) {
			throw new Error('EREQUESTPENDING: Запрос уже в процессе');
		}

		// Устанавливаем флаг, что запрос активен
		this.pendingRequests[url] = true;

		try {
			const res = await axios({
				method,
				url,
				data,
				headers,
			});
			return res?.data;
		} catch (error: any) {
			console.error(
				'Error making HTTP request:',
				error.response?.data?.error_message,
			);
			throw error.response?.data?.error_message;
		} finally {
			// Убираем флаг после завершения запроса
			delete this.pendingRequests[url];
		}
	}
}

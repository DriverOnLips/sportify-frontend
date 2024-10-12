import axios from 'axios';

export class EventsService {
	private static instance: EventsService;
	private domain = '';
	private config: { name: string; url: string }[] = [
		{ name: 'getEvents', url: `${this.domain}` },
		{ name: 'getEventInfo', url: `${this.domain}` },
	];

	constructor() {
		if (EventsService.instance) {
			return EventsService.instance;
		}

		EventsService.instance = this;
	}

	private async makeHttpRequest(url: string, params: any): Promise<any> {
		const res = await axios.get(url, { params });
		return res?.data;
	}

	async getEvents(
		count = 10,
		page?: number | null,
		query?: string | null,
		type?: string | null,
	): Promise<any> {
		const configItem = this.config.find((item) => item.name === 'getEvents');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getEvents');
		}

		const params = {
			number: count,
			...(page && { offset: (page - 1) * 100 }),
			...(!!query && { query }),
			...(!!type && { type }),
		};

		try {
			return await this.makeHttpRequest(`${configItem.url}`, params);
		} catch (error: any) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			return new Error(errorMessage);
		}
	}

	async getEventInfo(id: string): Promise<any | Error> {
		const configItem = this.config.find((item) => item.name === 'getEventInfo');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getEventInfo');
		}

		const params = {};

		try {
			return await this.makeHttpRequest(`${configItem.url}${id}`, params);
		} catch (error: any) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			return new Error(errorMessage);
		}
	}
}

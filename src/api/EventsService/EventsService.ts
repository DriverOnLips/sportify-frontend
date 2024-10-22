import axios from 'axios';
import { EventFromListApi } from 'types/types/EventFromList.ts';
import { EventTypeApi } from 'types/types/EventType.ts';

export class EventsService {
	private static instance: EventsService;
	private config: { name: string; url: string }[] = [
		{ name: 'getEvents', url: `/api/v1/events` },
		{ name: 'getEventInfo', url: `/api/v1/event` },
		{ name: 'subscribeOnEvent', url: `/api/v1/event/sub` },
	];

	constructor() {
		if (EventsService.instance) {
			return EventsService.instance;
		}

		EventsService.instance = this;
	}

	private async makeHttpRequest(url: string, params?: any): Promise<any> {
		const res = await axios.get(url, { params });
		return res?.data;
	}

	async getEvents(): Promise<EventFromListApi[]> {
		const configItem = this.config.find((item) => item.name === 'getEvents');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getEvents');
		}

		// const params = {
		// 	number: count,
		// 	...(page && { offset: (page - 1) * 100 }),
		// 	...(!!query && { query }),
		// 	...(!!type && { type }),
		// };

		try {
			return await this.makeHttpRequest(`${configItem.url}`);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getEventInfo(id: string): Promise<EventTypeApi> {
		const configItem = this.config.find((item) => item.name === 'getEventInfo');

		if (!configItem) {
			throw new Error('Не найдена конфигурация для getEventInfo');
		}

		try {
			return await this.makeHttpRequest(`${configItem.url}/${id}`);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async subscribeOnEvent(
		eventId: string,
		userId: string,
		sub: boolean,
	): Promise<any> {
		const configItem = this.config.find(
			(item) => item.name === 'subscribeOnEvent',
		);

		if (!configItem) {
			throw new Error('Не найдена конфигурация для subscribeOnEvent');
		}

		try {
			return await axios(`${configItem.url}/${eventId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					user_id: userId,
					sub: sub,
				},
			});
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

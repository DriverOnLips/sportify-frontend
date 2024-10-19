import axios from 'axios';
import {
	createEventShortInfoModel,
	EventShortInfoModel,
} from '../../types/types/Event/EventShortInfo.ts';
import {
	createEventInfoModel,
	EventInfoModel,
} from '../../types/types/Event/EventInfo.ts';
import {
	createEventCreateApi,
	EventCreateModel,
} from '../../types/types/Event/EventCreate.ts';
import {
	createEventUpdateApi,
	EventUpdateModel,
} from '../../types/types/Event/EventUpdate.ts';

enum RequestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type ConfigType = {
	name: string;
	url: string;
	method: RequestMethods;
};

export class EventsService {
	private static instance: EventsService;
	private pendingRequests: { [key: string]: boolean } = {};
	private config: ConfigType[] = [
		{ name: 'getEvents', url: `/api/events`, method: RequestMethods.GET },
		{ name: 'getEventInfo', url: `/api/event`, method: RequestMethods.GET },
		{
			name: 'createEvent',
			url: `/api/event`,
			method: RequestMethods.POST,
		},
		{
			name: 'updateEvent',
			url: `/api/event`,
			method: RequestMethods.PUT,
		},
		{
			name: 'deleteEvent',
			url: `/api/event`,
			method: RequestMethods.DELETE,
		},
		{
			name: 'subscribeOnEvent',
			url: `/api/event/sub`,
			method: RequestMethods.PUT,
		},
	];

	constructor() {
		if (EventsService.instance) {
			return EventsService.instance;
		}

		EventsService.instance = this;
	}

	private getConfigItem(name: string): ConfigType {
		const configItem = this.config.find((item) => item.name === name);

		if (!configItem) {
			throw new Error(`Не найдена конфигурация для ${name}`);
		}

		return configItem;
	}

	private async makeHttpRequest(
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
		} catch (error) {
			console.error('Error making HTTP request:', error);
			throw error;
		} finally {
			// Убираем флаг после завершения запроса
			delete this.pendingRequests[url];
		}
	}

	async getEvents(): Promise<EventShortInfoModel[]> {
		try {
			const configItem = this.getConfigItem('getEvents');

			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
			);

			return createEventShortInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getEventInfo(id: string): Promise<EventInfoModel> {
		try {
			const configItem = this.getConfigItem('getEventInfo');

			const response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}/${id}`,
			);

			return createEventInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async createEvent(event: EventCreateModel, userId: string): Promise<any> {
		try {
			const configItem = this.getConfigItem('createEvent');

			return await this.makeHttpRequest(
				configItem.method,
				configItem.url,
				{ event: createEventCreateApi(event), user_id: userId },
				{
					'Content-Type': 'application/json',
				},
			);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async updateEvent(event: EventUpdateModel, userId: string): Promise<any> {
		try {
			const configItem = this.getConfigItem('updateEvent');

			return await this.makeHttpRequest(
				configItem.method,
				`configItem.url/${event.id}`,
				{ event: createEventUpdateApi(event), user_id: userId },
				{
					'Content-Type': 'application/json',
				},
			);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async deleteEvent(eventId: string, userId: string): Promise<any> {
		try {
			const configItem = this.getConfigItem('deleteEvent');

			return await this.makeHttpRequest(
				configItem.method,
				`configItem.url/${eventId}`,
				{ user_id: userId },
			);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async subscribeOnEvent(
		eventId: string,
		userId: string,
		sub: boolean,
	): Promise<any> {
		try {
			const configItem = this.getConfigItem('subscribeOnEvent');

			return await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}/${eventId}`,
				{
					'Content-Type': 'application/json',
				},
				{
					user_id: userId,
					sub,
				},
			);
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

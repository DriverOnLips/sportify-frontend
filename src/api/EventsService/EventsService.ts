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
import { RequestMethods, ServiceBase } from '../ServiceBase.ts';

export class EventsService extends ServiceBase {
	private static instance: EventsService;

	constructor() {
		super();
		if (EventsService.instance) {
			return EventsService.instance;
		}

		EventsService.instance = this;
		this.config = [
			{ name: 'getEvents', url: `/api/events`, method: RequestMethods.GET },
			{ name: 'getEventInfo', url: `/api/event`, method: RequestMethods.GET },
			{ name: 'createEvent', url: `/api/event`, method: RequestMethods.POST },
			{ name: 'updateEvent', url: `/api/event`, method: RequestMethods.PUT },
			{ name: 'deleteEvent', url: `/api/event`, method: RequestMethods.DELETE },
			{
				name: 'subscribeOnEvent',
				url: `/api/event/sub`,
				method: RequestMethods.PUT,
			},
		];
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
				{ event_create: createEventCreateApi(event), user_id: userId },
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
				`${configItem.url}/${event.id}`,
				{ event_edit: createEventUpdateApi(event), user_id: userId },
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
				`${configItem.url}/${eventId}`,
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
					user_id: userId,
					sub,
				},
				{
					'Content-Type': 'application/json',
				},
			);
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

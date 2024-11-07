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
			{
				name: 'payForEvent',
				url: `/api/event/pay`,
				method: RequestMethods.POST,
			},
		];
	}

	async getEvents(
		sportType: string[],
		gameLevel: string[],
		dates: string[],
		priceMin: string | null,
		priceMax: string | null,
		address: string | null,
	): Promise<EventShortInfoModel[]> {
		try {
			const configItem = this.getConfigItem('getEvents');

			const params: string[] = [];

			if (sportType.length > 0) {
				const sportTypesParams = sportType
					.map((type) => `sport_type=${type}`)
					.join('&');
				params.push(sportTypesParams);
			}

			if (gameLevel.length > 0) {
				const gameLevelsParams = gameLevel
					.map((level) => `game_level=${level}`)
					.join('&');
				params.push(gameLevelsParams);
			}

			if (dates.length > 0) {
				const dateStartParams = dates
					.map((date) => `date_start=${date}`)
					.join('&');
				params.push(dateStartParams);
			}

			if (priceMin && Number(priceMin) > 0) {
				params.push(`price_min=${priceMin}`);
			}

			if (priceMax && Number(priceMax) > 0) {
				params.push(`price_max=${priceMax}`);
			}

			if (address) {
				params.push(`address=${encodeURIComponent(address)}`);
			}

			const url = `${configItem.url}?${params.join('&')}`;

			const response = await this.makeHttpRequest(configItem.method, url);

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

	async payForEvent(
		eventId: string,
		userId: string,
	): Promise<{ confirmation_url: string }> {
		try {
			const configItem = this.getConfigItem('payForEvent');
			const redirectUrl = `http://91.219.227.107//events/${eventId}`;

			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
				{
					redirect_url: redirectUrl,
					user_id: userId,
					event_id: eventId,
				},
				{
					'Content-Type': 'application/json',
				},
			);

			return response;
		} catch (error: any) {
			throw new Error(error);
		}
	}
}

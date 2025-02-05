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
			{
				name: 'getMyEvents',
				url: `/api/users/user_id/events`,
				method: RequestMethods.GET,
			},
			{
				name: 'getUpcomingEvents',
				url: `/api/users/user_id/sub_active/events`,
				method: RequestMethods.GET,
			},
			{
				name: 'getPastEvents',
				url: `/api/users/user_id/sub_archive/events`,
				method: RequestMethods.GET,
			},
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

	private processQueryParams(
		sportType: string[],
		gameLevel: string[],
		dates: string[],
		priceMin: string | null,
		priceMax: string | null,
		address: string | null,
	): string[] {
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
		return params;
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

			const params = this.processQueryParams(
				sportType,
				gameLevel,
				dates,
				priceMin,
				priceMax,
				address,
			);

			const url = `${configItem.url}?${params.join('&')}`;

			const response = await this.makeHttpRequest(configItem.method, url);

			return createEventShortInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getMyEvents(
		userId: string,
		sportType: string[],
		gameLevel: string[],
		dates: string[],
		priceMin: string | null,
		priceMax: string | null,
		address: string | null,
	): Promise<EventShortInfoModel[]> {
		try {
			const configItem = this.getConfigItem('getMyEvents');
			configItem.url = configItem.url.replace('user_id', userId);

			const params = this.processQueryParams(
				sportType,
				gameLevel,
				dates,
				priceMin,
				priceMax,
				address,
			);

			const url = `${configItem.url}?${params.join('&')}`;

			const response = await this.makeHttpRequest(configItem.method, url);

			return createEventShortInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getUpcomingEvents(
		userId: string,
		sportType: string[],
		gameLevel: string[],
		dates: string[],
		priceMin: string | null,
		priceMax: string | null,
		address: string | null,
	): Promise<EventShortInfoModel[]> {
		try {
			const configItem = this.getConfigItem('getUpcomingEvents');
			configItem.url = configItem.url.replace('user_id', userId);

			const params = this.processQueryParams(
				sportType,
				gameLevel,
				dates,
				priceMin,
				priceMax,
				address,
			);

			const url = `${configItem.url}?${params.join('&')}`;

			const response = await this.makeHttpRequest(configItem.method, url);

			return createEventShortInfoModel(response);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async getPastEvents(
		userId: string,
		sportType: string[],
		gameLevel: string[],
		dates: string[],
		priceMin: string | null,
		priceMax: string | null,
		address: string | null,
	): Promise<EventShortInfoModel[]> {
		try {
			const configItem = this.getConfigItem('getPastEvents');
			configItem.url = configItem.url.replace('user_id', userId);

			const params = this.processQueryParams(
				sportType,
				gameLevel,
				dates,
				priceMin,
				priceMax,
				address,
			);

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

	async createEvent(
		event: EventCreateModel,
		userId: string,
		tg?: { user_id: string; chat_id: string },
	): Promise<any> {
		try {
			const configItem = this.getConfigItem('createEvent');

			const data = {
				event_create: createEventCreateApi(event),
				user_id: userId,
				tg,
			};

			return await this.makeHttpRequest(
				configItem.method,
				configItem.url,
				data,
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

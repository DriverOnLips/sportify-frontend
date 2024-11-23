export enum TgStartPage {
	Events = 'events',
	EventCreate = 'create_event',
	Map = 'map',
}

export const convertStringToTgStartPage = (str: string): TgStartPage => {
	switch (str) {
		case 'events':
			return TgStartPage.Events;
		case 'create_event':
			return TgStartPage.EventCreate;
		case 'map':
			return TgStartPage.Map;
		default:
			throw new Error('Invalid TgStartPage');
	}
};

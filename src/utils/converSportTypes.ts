import { SportTypes } from '../types/enums/SportTypes.ts';

export const convertSportTypeToDisplayValue = (
	sportType: SportTypes,
): string => {
	switch (sportType) {
		case SportTypes.Football:
			return 'Футбол';
		case SportTypes.Basketball:
			return 'Баскетбол';
		case SportTypes.Volleyball:
			return 'Волейбол';
	}
};

export const convertDisplayValueToSportType = (
	sportType: string,
): SportTypes => {
	switch (sportType) {
		case 'Футбол':
			return SportTypes.Football;
		case 'Баскетбол':
			return SportTypes.Basketball;
		case 'Волейбол':
			return SportTypes.Volleyball;
		default:
			return SportTypes.Football;
	}
};

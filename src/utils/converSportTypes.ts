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
		case SportTypes.Tennis:
			return 'Теннис';
		case SportTypes.Running:
			return 'Бег';
		case SportTypes.Hockey:
			return 'Хоккей';
		case SportTypes.Skating:
			return 'Катание на коньках';
		case SportTypes.Skiing:
			return 'Катание на лыжах';
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
		case 'Теннис':
			return SportTypes.Tennis;
		case 'Бег':
			return SportTypes.Running;
		case 'Хоккей':
			return SportTypes.Hockey;
		case 'Катание на коньках':
			return SportTypes.Skating;
		case 'Катание на лыжах':
			return SportTypes.Skiing;
		default:
			return SportTypes.Football;
	}
};

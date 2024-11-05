import { GameLevels } from '../types/enums/GameLevels.ts';

export const convertGameLevelToDisplayValue = (
	gameLevel: GameLevels,
): string => {
	switch (gameLevel) {
		case GameLevels.Low:
			return 'Начинающий';
		case GameLevels.LowPlus:
			return 'Начинающий плюс';
		case GameLevels.MidMinus:
			return 'Средний минус';
		case GameLevels.Mid:
			return 'Средний';
		case GameLevels.MidPlus:
			return 'Средний плюс';
		case GameLevels.High:
			return 'Полу-профи';
		case GameLevels.HighPlus:
			return 'Профи';
	}
};

export const convertDisplayValueToGameLevel = (
	gameLevel: string,
): GameLevels => {
	switch (gameLevel) {
		case 'Начинающий':
			return GameLevels.Low;
		case 'Начинающий плюс':
			return GameLevels.LowPlus;
		case 'Средний минус':
			return GameLevels.MidMinus;
		case 'Средний':
			return GameLevels.Mid;
		case 'Средний плюс':
			return GameLevels.MidPlus;
		case 'Полу-профи':
			return GameLevels.High;
		case 'Профи':
			return GameLevels.HighPlus;
		default:
			return GameLevels.Mid;
	}
};

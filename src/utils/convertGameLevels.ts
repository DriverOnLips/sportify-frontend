import { GameLevels } from '../types/enums/GameLevels.ts';

export const convertGameLevelToDisplayValue = (
	gameLevel: GameLevels,
): string => {
	switch (gameLevel) {
		case GameLevels.Low:
			return 'Начинающий';
		case GameLevels.LowPlus:
			return 'Начинающий +';
		case GameLevels.MidMinus:
			return 'Средний -';
		case GameLevels.Mid:
			return 'Средний';
		case GameLevels.MidPlus:
			return 'Средний +';
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
		case 'Начинающий +':
			return GameLevels.LowPlus;
		case 'Средний -':
			return GameLevels.MidMinus;
		case 'Средний':
			return GameLevels.Mid;
		case 'Средний +':
			return GameLevels.MidPlus;
		case 'Полу-профи':
			return GameLevels.High;
		case 'Профи':
			return GameLevels.HighPlus;
		default:
			return GameLevels.Mid;
	}
};

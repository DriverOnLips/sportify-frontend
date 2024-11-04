import { GameLevels } from '../types/enums/GameLevels.ts';

export const convertGameLevelToDisplayValue = (
	gameLevel: GameLevels,
): string => {
	switch (gameLevel) {
		case GameLevels.Low:
			return 'Начинающий';
		case GameLevels.MidMinus:
			return 'Средний';
		case GameLevels.Mid:
			return 'Продвинутый';
		case GameLevels.MidPlus:
			return 'Полупрофессиональный';
		case GameLevels.High:
			return 'Профессиональный';
	}
};

export const convertDisplayValueToGameLevel = (
	gameLevel: string,
): GameLevels => {
	switch (gameLevel) {
		case 'Начинающий':
			return GameLevels.Low;
		case 'Средний':
			return GameLevels.MidMinus;
		case 'Продвинутый':
			return GameLevels.Mid;
		case 'Полупрофессиональный':
			return GameLevels.MidPlus;
		case 'Профессиональный':
			return GameLevels.High;
		default:
			return GameLevels.Mid;
	}
};

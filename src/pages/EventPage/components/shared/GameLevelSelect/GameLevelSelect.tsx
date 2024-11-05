import Select from 'components/lib/Select/Select.tsx';
import React, { useMemo, useState } from 'react';
import { GameLevels } from 'types/enums/GameLevels.ts';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';
import {
	convertGameLevelToDisplayValue,
	convertDisplayValueToGameLevel,
} from 'utils/convertGameLevels.ts';

type Props = {
	className?: string;
	value?: GameLevels[];
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const GameLevelSelect: React.FC<Props> = ({
	className,
	value,
	changeEventField,
}) => {
	const [gameLevels, setGameLevels] = useState<GameLevels[]>(value || []);

	const updateGameLevel = useMemo(
		() => (value: GameLevels[]) => changeEventField({ gameLevel: value }),
		[],
	);

	const handleChange = (displayValues: string[]) => {
		const gameLevels = displayValues.map((displayValue) =>
			convertDisplayValueToGameLevel(displayValue),
		);
		setGameLevels(gameLevels);
		updateGameLevel(gameLevels);
	};

	return (
		<Select
			className={className}
			value={gameLevels.map(convertGameLevelToDisplayValue)}
			options={Object.values(GameLevels).map((level) => ({
				value: convertGameLevelToDisplayValue(level),
				label: convertGameLevelToDisplayValue(level),
			}))}
			mode={'multiple'}
			allowClear={true}
			onChange={handleChange}
			placeholder='Выберите уровень игры'
		/>
	);
};

export default GameLevelSelect;

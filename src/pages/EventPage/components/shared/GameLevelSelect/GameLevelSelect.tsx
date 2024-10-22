import Select from '../../../../../components/Select/Select.tsx';
import React, { useMemo, useState } from 'react';
import { GameLevels } from '../../../../../types/enums/GameLevels.ts';
import { EventCreateModel } from '../../../../../types/types/Event/EventCreate.ts';

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

	const changeAddress = (val: GameLevels[]) => {
		console.log(val);
		setGameLevels(val);
		val && updateGameLevel(val);
	};

	return (
		<Select
			className={className}
			value={gameLevels}
			options={Object.values(GameLevels).map((type) => ({
				value: type,
				label: type.charAt(0).toUpperCase() + type.slice(1),
			}))}
			mode={'multiple'}
			allowClear={true}
			onChange={changeAddress}
		/>
	);
};

export default GameLevelSelect;

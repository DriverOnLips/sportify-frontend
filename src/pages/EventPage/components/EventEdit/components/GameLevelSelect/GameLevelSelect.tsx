import Select from 'components/Select/Select.tsx';
import React, { useMemo, useState } from 'react';
import { GameLevels } from 'types/enums/GameLevels.ts';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';

type Props = {
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const GameLevelSelect: React.FC<Props> = ({ changeEventField }) => {
	const [value, setValue] = useState<GameLevels | null>(null);

	const updateAddress = useMemo(
		() => (value: GameLevels) => changeEventField({ gameLevel: value }),
		[],
	);

	const changeAddress = (val: GameLevels | null) => {
		setValue(val);
		val && updateAddress(val);
	};

	return (
		<Select
			value={value}
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

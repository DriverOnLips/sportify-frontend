import { SportTypes } from 'types/enums/SportTypes.ts';
import Select from 'components/lib/Select/Select.tsx';
import useQueryParams from 'hooks/useQueryParams.ts';
import { SearchParams } from 'types/types/SearchParams/SearchParams.ts';
import { GameLevels } from 'types/enums/GameLevels.ts';
import {
	convertDisplayValueToGameLevel,
	convertGameLevelToDisplayValue,
} from 'utils/convertGameLevels.ts';

const HeaderGameLevelFilter = () => {
	const { gameLevel, setQueryParam } = useQueryParams();

	const handleChange = (values: SportTypes[]) => {
		setQueryParam(
			SearchParams.gameLevel,
			values.map(convertDisplayValueToGameLevel),
		);
	};

	return (
		<Select
			style={{ minWidth: 200 }}
			placeholder='Уровень игры'
			mode={'multiple'}
			value={(gameLevel as GameLevels[]).map(convertGameLevelToDisplayValue)}
			options={Object.values(GameLevels).map((type) => ({
				value: convertGameLevelToDisplayValue(type),
				label: convertGameLevelToDisplayValue(type),
			}))}
			onChange={handleChange}
		/>
	);
};

export default HeaderGameLevelFilter;

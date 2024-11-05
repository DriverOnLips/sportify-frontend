import { SportTypes } from 'types/enums/SportTypes.ts';
import {
	convertDisplayValueToSportType,
	convertSportTypeToDisplayValue,
} from 'utils/converSportTypes.ts';
import Select from 'components/lib/Select/Select.tsx';
import useQueryParams from 'hooks/useQueryParams.ts';
import { SearchParams } from 'types/types/SearchParams/SearchParams.ts';

const HeaderSportsTypeFilter = () => {
	const { sportType, setQueryParam } = useQueryParams();

	const handleChange = (values: SportTypes[]) => {
		setQueryParam(
			SearchParams.sportType,
			values.map(convertDisplayValueToSportType),
		);
	};

	return (
		<Select
			placeholder='Выберите вид спорта'
			mode={'multiple'}
			value={(sportType as SportTypes[]).map(convertSportTypeToDisplayValue)}
			options={Object.values(SportTypes).map((type) => ({
				value: convertSportTypeToDisplayValue(type),
				label: convertSportTypeToDisplayValue(type),
			}))}
			onChange={handleChange}
		/>
	);
};

export default HeaderSportsTypeFilter;

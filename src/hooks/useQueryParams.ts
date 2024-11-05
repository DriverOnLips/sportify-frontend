import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../types/types/SearchParams/SearchParams.ts';

const useQueryParams = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const sportType = searchParams.getAll(SearchParams.sportType);
	const gameLevel = searchParams.getAll(SearchParams.gameLevel);
	const date = searchParams.getAll(SearchParams.date);
	const priceMin = searchParams.get(SearchParams.priceMin);
	const priceMax = searchParams.get(SearchParams.PriceMax);
	const address = searchParams.get(SearchParams.address);
	const edit = searchParams.get(SearchParams.edit);

	const setQueryParam = (key: SearchParams, value: string) => {
		if (!value || value.trim().length === 0) {
			searchParams.delete(key);
		} else {
			searchParams.set(key, value);
		}
		setSearchParams(searchParams);
	};

	return {
		sportType,
		gameLevel,
		date,
		priceMin,
		priceMax,
		address,
		edit,
		setQueryParam,
	};
};

export default useQueryParams;

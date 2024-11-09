import useQueryParams from 'hooks/useQueryParams.ts';
import { SearchParams } from 'types/types/SearchParams/SearchParams.ts';
import React from 'react';
import Search from 'components/lib/Search/Search.tsx';
import HeaderFilters from '../Filters/HeaderFilters/HeaderFilters.tsx';
import useEventsList from 'hooks/useEventsList.tsx';
import styles from './HeaderSearch.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const HeaderSearch = () => {
	const { getEvents } = useEventsList();
	const location = useLocation();

	const navigate = useNavigate();

	const { address, setQueryParam } = useQueryParams();

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQueryParam(SearchParams.address, e.target.value);
	};

	const handlePressEnter = () => {
		navigate(`/events${location.search}`);
		getEvents();
	};

	return (
		<Search
			className={styles.header__search}
			value={address || ''}
			placeholder={'Введите адрес'}
			onChange={handleAddressChange}
			onPressEnter={handlePressEnter}
			onSearch={handlePressEnter}
			size={'large'}
			addonBefore={<HeaderFilters />}
			enterButton={'Найти'}
		></Search>
	);
};

export default HeaderSearch;

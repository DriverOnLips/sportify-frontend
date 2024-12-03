import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import useQueryParams from 'hooks/useQueryParams.ts';
import { SearchParams } from 'types/types/SearchParams/SearchParams.ts';
import Search from 'components/lib/Search/Search.tsx';
import HeaderFilters from '../Filters/HeaderFilters/HeaderFilters.tsx';
import useEventsList from '../../../../hooks/useEventsList.ts';
import styles from './HeaderSearch.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import useUserInfo from '../../../../hooks/useUserInfo.tsx';

const HeaderSearch = () => {
	const { user } = useUserInfo();
	const { getAllEvents, getMyEvents } = useEventsList();

	const location = useLocation();

	const navigate = useNavigate();

	const { address, setQueryParam } = useQueryParams();

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQueryParam(SearchParams.address, e.target.value);
	};

	const handlePressEnter = () => {
		switch (location.pathname) {
			case '/events':
				getAllEvents();
				break;
			case '/events-my':
				getMyEvents(user!.id);
				break;
			default:
				navigate(`/events${location.search}`);
				getAllEvents();
				break;
		}
	};

	return (
		<Search
			className={styles.header__search}
			value={address || ''}
			placeholder={'Поиск по мероприятиям'}
			onChange={handleAddressChange}
			onPressEnter={handlePressEnter}
			onSearch={handlePressEnter}
			size={'large'}
			addonBefore={<HeaderFilters />}
			enterButton={<SearchOutlined style={{ color: 'white' }} />}
		></Search>
	);
};

export default HeaderSearch;

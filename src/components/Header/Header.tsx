import React, { useCallback } from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';
import Text from '../lib/Text/Text.tsx';
import HeaderSearch from './components/Search/HeaderSearch.tsx';
import useEventsList from '../../hooks/useEventsList.tsx';

const Header: React.FC = () => {
	const navigate = useNavigate();
	// const location = useLocation();
	const { getEvents } = useEventsList();

	const handleLogoClick = useCallback(() => {
		// if (location.pathname === '/events') {
		// 	const eventsList = document.querySelector('.events_list-js');
		//
		// 	// почему-то пока не работает
		// 	eventsList?.scrollTo({ top: 0, behavior: 'smooth' });
		// } else {
		navigate('/events');
		getEvents();
		// }
	}, []);

	return (
		<>
			<header className={'header'}>
				<Text
					weight={'bold'}
					size={'s3'}
					className={'header__logo'}
					onClick={handleLogoClick}
				>
					Sportify
				</Text>
				<HeaderSearch />
				{/*<Input*/}
				{/*	placeholder='Поиск'*/}
				{/*// value={searchTerm}*/}
				{/*// onChange={(e) => setSearchTerm(e.target.value)}*/}
				{/*// onPressEnter={() => getEvents()}*/}
				{/*// className='header__search' // onClick={showModal}*/}
				{/*suffix={*/}
				{/*	<SearchOutlined*/}
				{/*		onClick={() => getEvents()}*/}
				{/*		style={{ cursor: 'pointer' }}*/}
				{/*	/>*/}
				{/*}*/}
				{/*/>*/}
				<nav className='header__nav'>
					<ul className='header__nav-list'>
						<li className='header__nav-item'>
							<Link to='/about'>
								<Button type='link'>О нас</Button>
							</Link>
						</li>
						<li className='header__nav-item'>
							<Link to='/profile'>
								<Button type='link'>Профиль</Button>
							</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Header;

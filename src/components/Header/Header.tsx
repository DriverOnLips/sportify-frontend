import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
	return (
		<>
			<header className='header'>
				<div className='header__logo'>Sportify</div>
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

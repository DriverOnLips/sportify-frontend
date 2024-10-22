import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ModalSportSelector from './ModalSportSelector';
import './Header.scss';

const Header: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleSearch = (value: string) => {
		console.log('Searching for:', value);
	};

	const showModal = () => {
		setIsModalVisible(true);
	};

	const hideModal = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<header className='header'>
				<div className='header__logo'>Sportify</div>
				<Input
					placeholder='Поиск'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					onPressEnter={() => handleSearch(searchTerm)}
					className='header__search'
					onClick={showModal}
					suffix={
						<SearchOutlined
							onClick={() => handleSearch(searchTerm)}
							style={{ cursor: 'pointer' }}
						/>
					}
				/>
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

			<ModalSportSelector
				isVisible={isModalVisible}
				onClose={hideModal}
			/>
		</>
	);
};

export default Header;

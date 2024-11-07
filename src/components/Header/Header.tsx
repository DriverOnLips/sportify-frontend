import React from 'react';
import HeaderSearch from './components/Search/HeaderSearch.tsx';
import styles from './Header.module.scss';

const Header: React.FC = () => {
	return (
		<>
			<header className={styles.header}>
				<HeaderSearch />
			</header>
		</>
	);
};

export default Header;

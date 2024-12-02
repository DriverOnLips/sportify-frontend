import React, { useEffect, useRef } from 'react';
import HeaderSearch from './components/Search/HeaderSearch.tsx';
import styles from './Header.module.scss';
import Text from '../lib/Text/Text.tsx';
import { useDispatch } from 'react-redux';
import { setSidebarOpenAction } from '../../states/AppState/AppState.tsx';
import { useScreenMode } from '../../hooks/useScreenMode.ts';
import { useNavigate } from 'react-router-dom';

const OFFSET_T0_OPEN_SIDEBAR = 150;

const Header: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 850;

	const touchStartX = useRef<number | null>(null);
	const touchEndX = useRef<number | null>(null);

	const handleLogoClick = () => {
		const contentDiv = document.getElementById('content');
		if (location.pathname === '/events') {
			contentDiv?.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		navigate('/events');
	};

	useEffect(() => {
		const handleTouchStart = (event: TouchEvent) => {
			touchStartX.current = event.touches[0].clientX;
		};

		const handleTouchEnd = (event: TouchEvent) => {
			touchEndX.current = event.changedTouches[0].clientX;

			if (touchStartX.current !== null && touchEndX.current !== null) {
				const diffX = touchStartX.current - touchEndX.current;

				console.log(diffX);
				if (diffX > OFFSET_T0_OPEN_SIDEBAR) {
					dispatch(setSidebarOpenAction(false));
				} else if (diffX < -OFFSET_T0_OPEN_SIDEBAR) {
					dispatch(setSidebarOpenAction(true));
				}
			}

			touchStartX.current = null;
			touchEndX.current = null;
		};

		window.addEventListener('touchstart', handleTouchStart);
		window.addEventListener('touchend', handleTouchEnd);

		return () => {
			window.removeEventListener('touchstart', handleTouchStart);
			window.removeEventListener('touchend', handleTouchEnd);
		};
	}, [dispatch]);

	return (
		<header className={styles.header}>
			<div className={styles.header__logo}>
				<Text
					weight={'bold'}
					size={'s3'}
					className={styles.header__logo_span}
					onClick={handleLogoClick}
				>
					{isWide ? 'MoveLife' : 'ML'}
				</Text>
			</div>
			<HeaderSearch />
		</header>
	);
};

export default Header;

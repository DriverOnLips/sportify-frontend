import React, { useEffect, useRef } from 'react';
import HeaderSearch from './components/Search/HeaderSearch.tsx';
import styles from './Header.module.scss';
import Text from '../lib/Text/Text.tsx';
import { useDispatch } from 'react-redux';
import {
	setSidebarOpenAction,
	toggleSidebarOpenAction,
} from '../../states/AppState/AppState.tsx';
import { useScreenMode } from '../../hooks/useScreenMode.ts';
import { useNavigate } from 'react-router-dom';
import MenuSwitcher from '../Menu/Switcher/Switcher.tsx';
import MoveLifeLogo from '../../assets/move-life_logo.svg';

const OFFSET_X_T0_OPEN_SIDEBAR = 100;
const OFFSET_Y_T0_OPEN_SIDEBAR = 50;

const Header: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 850;

	const touchStartX = useRef<number | null>(null);
	const touchEndX = useRef<number | null>(null);
	const touchStartY = useRef<number | null>(null);
	const touchEndY = useRef<number | null>(null);

	const handleLogoClick = () => {
		const contentDiv = document.getElementById('content');
		if (location.pathname === '/events') {
			contentDiv?.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		navigate('/events');
	};

	const handleMenuSwitcherClick = () => {
		dispatch(toggleSidebarOpenAction());
	};

	useEffect(() => {
		const handleTouchStart = (event: TouchEvent) => {
			touchStartX.current = event.touches[0].clientX;
			touchStartY.current = event.touches[0].clientY;
		};

		const handleTouchEnd = (event: TouchEvent) => {
			touchEndX.current = event.changedTouches[0].clientX;
			touchEndY.current = event.changedTouches[0].clientY;

			if (
				touchStartX.current !== null &&
				touchEndX.current !== null &&
				touchStartY.current !== null &&
				touchEndY.current !== null
			) {
				const diffX = touchStartX.current - touchEndX.current;
				const diffY = touchStartY.current - touchEndY.current;

				if (
					Math.abs(diffY) < OFFSET_Y_T0_OPEN_SIDEBAR &&
					diffX > OFFSET_X_T0_OPEN_SIDEBAR
				) {
					dispatch(setSidebarOpenAction(false));
				} else if (
					Math.abs(diffY) < OFFSET_Y_T0_OPEN_SIDEBAR &&
					diffX < -OFFSET_X_T0_OPEN_SIDEBAR
				) {
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
			{isWide ? (
				<div
					className={styles.logoContainer}
					onClick={handleLogoClick}
				>
					<img
						src={MoveLifeLogo}
						alt='MoveLife Logo'
						className={styles.logo}
					/>
					<div className={styles.logoText}>
						<Text
							weight='bold'
							size='s5'
							className={styles.logoTitle}
						>
							MOVE-LIFE
						</Text>
						<Text
							weight='medium'
							size='s6'
							className={styles.logoSubtitle}
						>
							москва
						</Text>
					</div>
				</div>
			) : (
				<MenuSwitcher onClick={handleMenuSwitcherClick} />
			)}

			<HeaderSearch />

			{isWide ? (
				<MenuSwitcher onClick={handleMenuSwitcherClick} />
			) : (
				<div
					className={styles.shortLogoContainer}
					onClick={handleLogoClick}
				>
					<img
						src={MoveLifeLogo}
						alt='MoveLife Logo'
						className={styles.logo}
					/>
				</div>
			)}
		</header>
	);
};

export default Header;

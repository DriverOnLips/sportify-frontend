import React from 'react';
import YandexMap from '../../components/lib/YandexMap/YandexMap.tsx';
import styles from './MapPage.module.scss';

const MapPage: React.FC = () => {
	return (
		<div className={styles['map-container']}>
			<YandexMap address='Москва, Красная площадь' />
		</div>
	);
};

export default MapPage;

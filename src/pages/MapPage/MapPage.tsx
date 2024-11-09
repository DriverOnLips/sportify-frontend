import React, { useEffect, useState } from 'react';
import YandexMap from '../../components/lib/YandexMap/YandexMap.tsx';
import styles from './MapPage.module.scss';

const MapPage: React.FC = () => {
	const [userLocation, setUserLocation] = useState<[number, number] | null>(
		null,
	);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation([latitude, longitude]);
				},
				(error) => {
					console.error('Ошибка при получении геопозиции:', error);
					setUserLocation([55.751244, 37.618423]);
				},
			);
		} else {
			console.error('Геолокация не поддерживается в этом браузере');
			setUserLocation([55.751244, 37.618423]);
		}
	}, []);

	return (
		<div className={styles['map-container']}>
			{userLocation && (
				<YandexMap
					center={userLocation}
					zoom={17}
				/>
			)}
		</div>
	);
};

export default MapPage;

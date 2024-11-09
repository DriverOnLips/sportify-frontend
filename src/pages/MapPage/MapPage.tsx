import React, { useEffect, useState } from 'react';
import YandexMap from '../../components/lib/YandexMap/YandexMap.tsx';
import styles from './MapPage.module.scss';
import useEventsList from '../../hooks/useEventsList.tsx';
import { convertSportTypeToDisplayValue } from '../../utils/converSportTypes.ts';

const MapPage: React.FC = () => {
	const [userLocation, setUserLocation] = useState<[number, number] | null>(
		null,
	);
	const { events, deleteEvents } = useEventsList();

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

		return () => deleteEvents();
	}, []);

	const eventCoordinates = events.map((event) => ({
		id: event.id,
		name: convertSportTypeToDisplayValue(event.sportType),
		latitude: Number(event.latitude) || 0,
		longitude: Number(event.longitude) || 0,
		eventUrl: `/events/${event.id}`,
	}));

	return (
		<div className={styles['map-container']}>
			{userLocation && (
				<YandexMap
					center={userLocation}
					zoom={17}
					isUserLocation={true}
					events={eventCoordinates}
				/>
			)}
		</div>
	);
};

export default MapPage;

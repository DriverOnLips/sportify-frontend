import React, { useEffect, useState } from 'react';
import YandexMap from '../../components/lib/YandexMap/MapPageYandexMap/MapPageYandexMap.tsx';
import styles from './MapPage.module.scss';
import useEventsList from '../../hooks/useEventsList.ts';
import { convertSportTypeToDisplayValue } from '../../utils/converSportTypes.ts';

const MapPage: React.FC = () => {
	const [userLocation, setUserLocation] = useState<[number, number] | null>(
		null,
	);
	const { allEvents, getAllEvents, deleteAllEvents } = useEventsList();

	useEffect(() => {
		// Загружаем события только если они еще не загружены
		if (allEvents.length === 0) {
			getAllEvents();
		}

		// Получаем геопозицию пользователя
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setUserLocation([latitude, longitude]);
				},
				(error) => {
					console.error('Ошибка при получении геопозиции:', error);
					setUserLocation([55.751244, 37.618423]); // Москва по умолчанию
				},
			);
		} else {
			console.error('Геолокация не поддерживается в этом браузере');
			setUserLocation([55.751244, 37.618423]); // Москва по умолчанию
		}

		// Очистка событий при выходе с компонента
		return () => {
			deleteAllEvents();
		};
	}, []); // Пустой массив зависимостей для одного вызова при монтировании

	const eventCoordinates = allEvents.map((event) => ({
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

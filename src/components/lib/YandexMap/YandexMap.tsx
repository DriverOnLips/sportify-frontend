import React, { useEffect, useRef } from 'react';
import styles from './YandexMap.module.scss';

declare global {
	interface Window {
		ymaps: any;
	}
}

interface YandexMapProps {
	address?: string;
	center?: [number, number];
	zoom?: number;
	isUserLocation?: boolean;
	events?: {
		id: string;
		name: string;
		latitude: number;
		longitude: number;
		eventUrl: string;
	}[];
}

const YandexMap: React.FC<YandexMapProps> = ({
	address,
	center,
	zoom = 17,
	isUserLocation = false,
	events = [],
}) => {
	const mapRef = useRef<any>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const initializeMap = () => {
			const mapCenter = center || [55.751244, 37.618423];

			if (!mapRef.current) {
				mapRef.current = new window.ymaps.Map(mapContainerRef.current, {
					center: mapCenter,
					zoom,
					controls: [],
				});
			} else {
				mapRef.current.setCenter(mapCenter);
				mapRef.current.setZoom(zoom);
			}

			mapRef.current.geoObjects.removeAll();

			const placemark = new window.ymaps.Placemark(
				mapCenter,
				{
					iconCaption: isUserLocation ? 'Я здесь' : 'Место события',
				},
				{
					preset: isUserLocation
						? 'islands#redCircleDotIcon'
						: 'islands#governmentCircleIcon',
					iconColor: isUserLocation ? '#FF0000' : '#1E98FF',
				},
			);
			mapRef.current.geoObjects.add(placemark);

			events.forEach((event) => {
				const coords: [number, number] = [event.latitude, event.longitude];

				const eventPlacemark = new window.ymaps.Placemark(
					coords,
					{
						iconCaption: event.name,
					},
					{
						preset: 'islands#blueDotIcon',
					},
				);

				eventPlacemark.events.add('click', () => {
					window.location.href = event.eventUrl;
				});

				mapRef.current.geoObjects.add(eventPlacemark);
			});
		};

		if (window.ymaps) {
			window.ymaps.ready(initializeMap);
		} else {
			console.error('Yandex Maps API не загружен.');
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.destroy();
			}
		};
	}, [center, zoom, isUserLocation, events]);

	return (
		<div
			ref={mapContainerRef}
			className={styles.map}
		/>
	);
};

export default YandexMap;

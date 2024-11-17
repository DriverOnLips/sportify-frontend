import React, { useEffect, useRef, useState } from 'react';
import styles from './MapPageYandexMap.module.scss';

declare global {
	interface Window {
		ymaps: any;
	}
}

interface YandexMapProps {
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
	center,
	zoom = 17,
	isUserLocation = false,
	events = [],
}) => {
	const mapRef = useRef<any>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const [ymapsLoaded, setYmapsLoaded] = useState(false);

	useEffect(() => {
		const checkYandexAPI = () => {
			if (window.ymaps && window.ymaps.ready) {
				window.ymaps.ready(() => {
					setYmapsLoaded(true);
				});
			} else {
				setTimeout(checkYandexAPI, 200);
			}
		};

		checkYandexAPI();
	}, []);

	useEffect(() => {
		const initializeMap = () => {
			if (!window.ymaps) {
				console.error('Yandex Maps API не загружен.');
				return;
			}

			const mapCenter = center || [55.7960599, 37.5380087];

			if (!mapRef.current) {
				mapRef.current = new window.ymaps.Map(mapContainerRef.current, {
					center: mapCenter,
					zoom,
					controls: ['zoomControl'],
				});
			} else {
				mapRef.current.setCenter(mapCenter);
				mapRef.current.setZoom(zoom);
			}

			mapRef.current.geoObjects.removeAll();

			if (isUserLocation) {
				const userLocationPlacemark = new window.ymaps.Placemark(
					mapCenter,
					{
						iconCaption: 'Я здесь',
					},
					{
						preset: 'islands#redCircleDotIcon',
						iconColor: '#FF0000',
					},
				);
				mapRef.current.geoObjects.add(userLocationPlacemark);
			}

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

		if (ymapsLoaded) {
			initializeMap();
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.destroy();
				mapRef.current = null;
			}
		};
	}, [center, zoom, isUserLocation, events, ymapsLoaded]);

	return (
		<div
			ref={mapContainerRef}
			className={styles.map}
		/>
	);
};

export default YandexMap;

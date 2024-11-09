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
}

const YandexMap: React.FC<YandexMapProps> = ({
	address,
	center,
	zoom = 17,
}) => {
	const mapRef = useRef<any>(null);
	const mapContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const initializeMap = () => {
			// Дефотный центр - Москва
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

			// Удаляем старые метки и добавляем новую
			mapRef.current.geoObjects.removeAll();
			const placemark = new window.ymaps.Placemark(mapCenter);
			mapRef.current.geoObjects.add(placemark);

			if (address) {
				const geocoder = window.ymaps.geocode(address);
				geocoder.then((res: any) => {
					const coords = res.geoObjects.get(0).geometry.getCoordinates();
					mapRef.current.setCenter(coords);
					const addressPlacemark = new window.ymaps.Placemark(coords);
					mapRef.current.geoObjects.add(addressPlacemark);
				});
			}
		};

		if (window.ymaps) {
			window.ymaps.ready(initializeMap);
		} else {
			console.error('Yandex Maps API не загружен.');
		}
	}, [address, center, zoom]);

	return (
		<div
			ref={mapContainerRef}
			className={styles.map}
		/>
	);
};

export default YandexMap;

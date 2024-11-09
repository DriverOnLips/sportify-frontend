import React, { useEffect, useRef } from 'react';
import styles from './YandexMap.module.scss';

declare global {
	interface Window {
		ymaps: any;
	}
}

interface YandexMapProps {
	address: string;
	center?: [number, number];
	zoom?: number;
}

const YandexMap: React.FC<YandexMapProps> = ({
	address,
	center,
	zoom = 17,
}) => {
	const mapRef = useRef<any>(null);

	useEffect(() => {
		const initializeMap = () => {
			const geocoder = window.ymaps.geocode(address);
			geocoder.then((res: any) => {
				const coords = res.geoObjects.get(0).geometry.getCoordinates();

				const mapCenter = center || coords;

				if (!mapRef.current) {
					mapRef.current = new window.ymaps.Map('map', {
						center: mapCenter,
						zoom,
					});
				} else {
					mapRef.current.setCenter(mapCenter);
					mapRef.current.setZoom(zoom);
				}

				mapRef.current.geoObjects.removeAll();
				const placemark = new window.ymaps.Placemark(coords);
				mapRef.current.geoObjects.add(placemark);
			});
		};

		if (window.ymaps) {
			window.ymaps.ready(initializeMap);
		}
	}, [address, center, zoom]);

	return (
		<div className={styles.mapContainer}>
			<div
				id='map'
				className={styles.map}
			></div>
		</div>
	);
};

export default YandexMap;

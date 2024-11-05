import React, { useEffect, useRef } from 'react';
import styles from './YandexMap.module.scss';

declare global {
	interface Window {
		ymaps: any;
	}
}

interface YandexMapProps {
	address: string;
}

const YandexMap: React.FC<YandexMapProps> = ({ address }) => {
	const mapRef = useRef<any>(null);

	useEffect(() => {
		const initializeMap = () => {
			const geocoder = window.ymaps.geocode(address);
			geocoder.then((res: any) => {
				const coords = res.geoObjects.get(0).geometry.getCoordinates();

				if (!mapRef.current) {
					mapRef.current = new window.ymaps.Map('map', {
						center: coords,
						zoom: 18,
					});
				} else {
					mapRef.current.setCenter(coords);
				}

				mapRef.current.geoObjects.removeAll();
				const placemark = new window.ymaps.Placemark(coords);
				mapRef.current.geoObjects.add(placemark);
			});
		};

		if (window.ymaps) {
			window.ymaps.ready(initializeMap);
		}
	}, [address]);

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

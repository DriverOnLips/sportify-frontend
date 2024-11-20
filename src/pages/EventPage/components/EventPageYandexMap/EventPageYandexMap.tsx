import React, { useEffect, useRef, useState } from 'react';
import styles from './EventPageYandexMap.module.scss';

interface YandexMapProps {
	address: string;
}

const YandexMap: React.FC<YandexMapProps> = ({ address }) => {
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
		const initializeMap = async () => {
			if (!window.ymaps) {
				console.error('Yandex Maps API не загружен.');
				return;
			}

			if (!mapRef.current) {
				mapRef.current = new window.ymaps.Map(mapContainerRef.current, {
					center: [55.7960599, 37.5380087],
					zoom: 10,
					controls: ['zoomControl', 'routeButtonControl'],
				});
			}

			try {
				const userLocation = await new Promise<[number, number]>(
					(resolve, reject) => {
						window.ymaps.geolocation
							.get({ provider: 'browser', mapStateAutoApply: true })
							.then((result: any) => {
								resolve(result.geoObjects.position);
							})
							.catch((error: any) => {
								console.error('Ошибка определения местоположения:', error);
								reject(error);
							});
					},
				);

				const eventCoords = await new Promise<[number, number]>(
					(resolve, reject) => {
						window.ymaps
							.geocode(address)
							.then((result: any) => {
								const firstGeoObject = result.geoObjects.get(0);
								if (firstGeoObject) {
									resolve(firstGeoObject.geometry.getCoordinates());
								} else {
									reject('Адрес не найден.');
								}
							})
							.catch((error: any) => {
								console.error('Ошибка при геокодировании адреса:', error);
								reject(error);
							});
					},
				);

				const createRoute = (routingMode: string, color: string) => {
					return new window.ymaps.multiRouter.MultiRoute(
						{
							referencePoints: [userLocation, eventCoords],
							params: { routingMode },
						},
						{
							routeStrokeColor: color,
							routeStrokeWidth: 4,
						},
					);
				};

				const pedestrianRoute = createRoute('pedestrian', '#1E98FF');
				const drivingRoute = createRoute('auto', '#FF4500');
				const transitRoute = createRoute('masstransit', '#32CD32');

				mapRef.current.geoObjects.removeAll();
				mapRef.current.geoObjects.add(pedestrianRoute);
				mapRef.current.geoObjects.add(drivingRoute);
				mapRef.current.geoObjects.add(transitRoute);

				const bounds = window.ymaps.util.bounds.fromPoints([
					userLocation,
					eventCoords,
				]);
				mapRef.current.setBounds(bounds, {
					checkZoomRange: true,
					zoomMargin: [50, 50, 50, 50],
				});
			} catch (error) {
				console.error('Ошибка создания маршрута:', error);
			}
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
	}, [address, ymapsLoaded]);

	return (
		<div
			ref={mapContainerRef}
			className={styles.map}
		/>
	);
};

export default YandexMap;

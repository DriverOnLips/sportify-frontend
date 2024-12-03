import React, { useEffect, useRef, useState } from 'react';
import styles from './MapPageYandexMap.module.scss';
import { GameLevels } from '../../../../types/enums/GameLevels';
import { convertGameLevelToDisplayValue } from '../../../../utils/convertGameLevels';

interface YandexMapProps {
	center?: [number, number];
	zoom?: number;
	isUserLocation?: boolean;
	events?: {
		id: string;
		name: string;
		price: number;
		adress: string;
		capacity: number | null;
		busy: number;
		game_level: GameLevels[];
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
					controls: [],
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

				const levelLabel = event.game_level
					.map((level) => convertGameLevelToDisplayValue(level))
					.join(', ');

				const eventPlacemark = new window.ymaps.Placemark(
					coords,
					{
						iconContent: `
            <strong 
              id="placemark-text-${event.id}"
              style="
                background-color: #1e98ff; 
                color: white; border-radius: 10px; 
                border: 4px solid #1e98ff; 
                box-shadow: 0 0 0 2px white; 
                padding: 4px;
                cursor: pointer
              ">
							${event.name}
						</strong>`,
						balloonContentHeader: `<strong style="color: #1e98ff; font-size: 18px;">${event.name}</strong>`,
						balloonContentBody: `
              <div style="font-family: 'Arial', sans-serif; font-size: 14px; color: #333;">
                <p style="margin: 8px 0; font-size: 16px; font-weight: bold;">Цена: <span style="color: #1e98ff;">${event.price}₽</span></p>
                <p style="margin: 8px 0;">Адрес: <span style="color: #666;">${event.adress}</span></p>
                <p style="margin: 8px 0;">Уровень: <span style="color: #666;">${levelLabel}</span></p>
                <p style="margin: 8px 0;"><span style="color: #1e98ff;">${event.busy} / ${event.capacity}</span></p>
                <div style="margin-top: 16px; text-align: center;">
                  <button 
                    style="
                      background-color: #1e98ff; 
                      color: white; 
                      padding: 10px 20px; 
                      border: none; 
                      border-radius: 5px; 
                      cursor: pointer; 
                      font-size: 16px; 
                      font-weight: bold; 
                      transition: background-color 0.3s ease;
                    " 
                    onclick="window.open('${event.eventUrl}', '_self')"
                    onmouseover="this.style.backgroundColor='#1569C7';"
                    onmouseout="this.style.backgroundColor='#1e98ff';"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            `,
					},
					{
						preset: 'islands#blueIcon',
					},
				);

				const placemarkTextElement = document.getElementById(
					`placemark-text-${event.id}`,
				);
				if (placemarkTextElement) {
					placemarkTextElement.addEventListener('click', () => {
						eventPlacemark.balloon.open();
						eventPlacemark.events.fire('click');
					});
				}

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

import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import styles from './YandexMap.module.scss';

interface YandexMapProps {
	center: [number, number];
	markerPosition: [number, number];
	markerContent: string;
}

const YandexMap: React.FC<YandexMapProps> = ({
	center,
	markerPosition,
	markerContent,
}) => {
	return (
		<div className={styles.mapContainer}>
			<YMaps>
				<Map
					defaultState={{ center, zoom: 12 }}
					width='100%'
					height='400px'
				>
					<Placemark
						geometry={markerPosition}
						properties={{
							iconContent: markerContent,
						}}
						options={{
							preset: 'islands#icon',
							iconColor: '#0095b6',
						}}
					/>
				</Map>
			</YMaps>
		</div>
	);
};

export default YandexMap;

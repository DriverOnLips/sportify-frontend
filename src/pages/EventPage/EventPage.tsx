import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	createEventTypeModel,
	EventTypeModel,
} from '../../types/types/EventType.ts';
import { EventsService } from '../../api/EventsService/EventsService.ts';
import { Loader } from '../../components/Loader/Loader.tsx';
import EventInfo from './components/EventInfo.tsx';
import YandexMap from './components/YandexMap.tsx';
import styles from './EventPage.module.scss';

const EventPage: React.FC = () => {
	const { id } = useParams();
	if (!id) return <React.Fragment />;

	const [event, setEvent] = useState<EventTypeModel | null>(null);

	const e: EventTypeModel = useMemo(() => {
		return {
			id: '1',
			sportType: SportTypes.Football,
			address: 'London',
			date: String(new Date()),
			startTime: String(new Date()),
			endTime: null,
			price: 100500,
			isFree: false,
			gameLevel: [GameLevels.High, GameLevels.MidPlus],
			description: 'Exciting football match in London!',
			rawMessage: null,
			capacity: 15,
			busy: 5,
			subscribersId: [],
			preview:
				'https://avatars.dzeninfra.ru/get-zen_doc/2352854/pub_62a6dcd0c45e772bdf322942_62a6e39f976862692ac1769d/scale_1200',
			photos: [],
		};
	}, []);

	const eventsService = new EventsService();

	const getEvents = async () => {
		try {
			const e = await eventsService.getEventInfo(id);
			setEvent(createEventTypeModel(e));
		} catch (e) {
			toast.message(`Ошибка при получении данных: ${(e as Error).message}`, {
				className: 'error',
				duration: 3000,
			});
		}
	};

	useEffect(() => {
		getEvents();
	}, []);

	return (
		<div className={styles.eventPage}>
			<div className={styles.eventContainer}>
				{event ? <EventInfo event={event} /> : <Loader />}
			</div>
			{event && (
				<YandexMap
					center={[51.5074, -0.1278]}
					markerPosition={[51.5074, -0.1278]}
					markerContent='Лондон'
				/>
			)}
		</div>
	);
};

export default EventPage;

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventTypeModel } from '../../types/types/EventType.ts';
import { EventsService } from '../../api/EventsService/EventsService.ts';
import { SportTypes } from '../../types/enums/SportTypes.ts';
import { GameLevels } from '../../types/enums/GameLevels.ts';
import { Loader } from '../../components/Loader/Loader.tsx';
import EventInfo from './components/EventInfo.tsx'; // Импортируем новый компонент
import styles from './EventPage.module.scss'; // Импортируем стили

const EventPage: React.FC = () => {
	const { id } = useParams();
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
		// const evts = await eventsService.getEventInfo(id);
		setTimeout(() => {
			setEvent(e);
		}, 1000);
	};

	useEffect(() => {
		getEvents();
	}, []);

	return (
		<div className={styles.eventPage}>
			{event ? <EventInfo event={event} /> : <Loader />}
		</div>
	);
};

export default EventPage;

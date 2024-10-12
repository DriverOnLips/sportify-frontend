import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventTypeModel } from '../../types/types/EventType.ts';
import { EventsService } from '../../api/EventsService/EventsService.ts';
import { SportTypes } from '../../types/enums/SportTypes.ts';
import { GameLevels } from '../../types/enums/GameLevels.ts';
import { Loader } from '../../components/Loader/Loader.tsx';

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
			description: null,
			rawMessage: null,
			capacity: 15,
			busy: 5,
			subscribersId: [],
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
		<>
			{event ? (
				<div className={'event_page'}>
					<span>{event.id}</span>
					<span>{event.description}</span>
					<span>{event.address}</span>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export default EventPage;

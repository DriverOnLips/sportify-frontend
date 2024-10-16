import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventsService } from '../../api/EventsService/EventsService.ts';
import { Loader } from 'components/Loader/Loader.tsx';
import { showToast } from '../../components/Toast/Toast.tsx';
import {
	createEventTypeModel,
	EventTypeModel,
} from '../../types/types/EventType.ts';
import EventInfo from './components/EventInfo.tsx';

const EventPage: React.FC = () => {
	const { id } = useParams();
	const [event, setEvent] = useState<EventTypeModel | null>(null);

	const eventsService = new EventsService();

	const getEvents = async () => {
		if (!id) {
			return;
		}

		try {
			const e = await eventsService.getEventInfo(id);
			setEvent(createEventTypeModel(e));
		} catch (e) {
			showToast(
				'error',
				'Ошибка',
				`Ошибка при получении данных: ${(e as Error).message}`,
			);
		}
	};

	useEffect(() => {
		getEvents();
	}, [getEvents]);

	return (
		<div>
			<div>{event ? <EventInfo event={event} /> : <Loader />}</div>
		</div>
	);
};

export default EventPage;

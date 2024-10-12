import ListItem from './components/ListItem/ListItem';
import { EventFromListModel } from '../../types/types/EventFromList.ts';
import { EventsService } from '../../api/EventsService/EventsService.ts';
import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button.tsx';

const EventsList: React.FC = () => {
	const [events, setEvents] = useState<EventFromListModel[]>();
	const e: EventFromListModel[] = [
		{
			id: '1',
			name: 'Футбольчик',
		},
		{
			id: '2',
			name: 'Баскетбол',
		},
	];

	const eventsService = new EventsService();

	const getEvents = async () => {
		// const evts = await eventsService.getEvents(10);
		setEvents(e);
	};

	useEffect(() => {
		getEvents();
	}, []);

	return (
		<div className='events_list'>
			<Button>Кнопка</Button>
			{events?.length && events.length > 0 ? (
				events.map((event) => (
					<ListItem
						key={event.id}
						event={event}
					/>
				))
			) : (
				<span>Нет событий</span>
			)}
		</div>
	);
};

export default EventsList;

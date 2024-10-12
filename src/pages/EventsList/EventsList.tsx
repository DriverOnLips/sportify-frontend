import ListItem from './components/ListItem/ListItem';
import { EventFromListModel } from '../../types/types/EventFromList.ts';
import { EventsService } from '../../api/EventsService/EventsService.ts';
import React, { useEffect, useState } from 'react';
import { SportTypes } from '../../types/enums/SportTypes.ts';
import { GameLevels } from '../../types/enums/GameLevels.ts';
import styles from './EventsList.module.scss';

const generateEvents = (): EventFromListModel[] => {
	const events: EventFromListModel[] = [];

	for (let i = 1; i <= 30; i++) {
		const event: EventFromListModel = {
			id: `event_${i}`, // уникальный ID
			sportType: SportTypes.Football,
			address: 'London',
			date: String(new Date()),
			startTime: String(new Date()),
			endTime: null,
			price: 100500,
			isFree: false,
			gameLevel: [GameLevels.High, GameLevels.MidPlus],
			capacity: 15,
			busy: 5,
			subscribersId: [],
			preview: '',
			photos: [],
		};
		events.push(event);
	}

	return events;
};

const EventsList: React.FC = () => {
	const [events, setEvents] = useState<EventFromListModel[]>();

	const e = generateEvents();
	const eventsService = new EventsService();

	const getEvents = async () => {
		// const evts = await eventsService.getEvents(10);
		setEvents(e);
	};

	useEffect(() => {
		getEvents();
	}, []);

	return (
		<div className={styles.events_list}>
			{events?.length && events.length > 0 ? (
				<div className={styles.events_list__container}>
					{events.map((event) => (
						<ListItem
							key={event.id}
							event={event}
						/>
					))}
				</div>
			) : (
				<span>Нет событий</span>
			)}
		</div>
	);
};

export default EventsList;

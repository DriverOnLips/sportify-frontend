import React, {useEffect, useState} from 'react';
import {EventsService} from '../../api/EventsService/EventsService.ts';
import {Loader} from '../../components/Loader/Loader.tsx';
import {showToast} from '../../components/Toast/Toast.tsx';
import {createEventFromListModel, EventFromListModel,} from '../../types/types/EventFromList.ts';
import ListItem from './components/ListItem/ListItem';
import styles from './EventsList.module.scss';

const EventsList: React.FC = () => {
	const [events, setEvents] = useState<EventFromListModel[]>();

	const eventsService = new EventsService();

	const getEvents = async () => {
		try {
			const evts = await eventsService.getEvents();
			setEvents(createEventFromListModel(evts));
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
				<Loader />
			)}
		</div>
	);
};

export default EventsList;

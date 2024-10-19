import React, { useEffect, useState } from 'react';
import { EventsService } from 'api/EventsService/EventsService.ts';
import { Loader } from 'components/Loader/Loader.tsx';
import { showToast } from 'components/Toast/Toast.tsx';
import { EventShortInfoModel } from '../../types/types/Event/EventShortInfo.ts';
import ListItem from './components/ListItem/ListItem';
import styles from './EventsList.module.scss';

const EventsList: React.FC = () => {
	const [events, setEvents] = useState<EventShortInfoModel[]>();

	const eventsService = new EventsService();

	const getEvents = async () => {
		try {
			const evts = await eventsService.getEvents();
			setEvents(evts);
		} catch (error: any) {
			if (!error.message?.includes('EREQUESTPENDING')) {
				showToast(
					'error',
					'Ошибка',
					`Ошибка при получении данных: ${(error as Error).message}`,
				);
			}
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

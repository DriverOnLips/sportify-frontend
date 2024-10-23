import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EventsService } from 'api/EventsService/EventsService.ts';
import { Loader } from 'components/Loader/Loader.tsx';
import { showToast } from 'components/Toast/Toast.tsx';
import { EventShortInfoModel } from '../../types/types/Event/EventShortInfo.ts';
import ListItem from './components/ListItem/ListItem';
import styles from './EventsList.module.scss';

const EventsList: React.FC = () => {
	const [events, setEvents] = useState<EventShortInfoModel[]>([]);
	const [filteredEvents, setFilteredEvents] = useState<EventShortInfoModel[]>(
		[],
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [searchParams] = useSearchParams();
	const sportType = searchParams.get('sport_type');

	const eventsService = new EventsService();

	const getEvents = async () => {
		try {
			const evts = await eventsService.getEvents();
			setEvents(evts);
			setIsLoading(false);
		} catch (error: any) {
			setIsLoading(false);
			if (!error.message?.includes('EREQUESTPENDING')) {
				showToast(
					'error',
					'Ошибка',
					`Ошибка при получении данных: ${(error as Error).message}`,
				);
			}
		}
	};

	const filterEventsBySportType = (sportType: string | null) => {
		if (sportType && events.length > 0) {
			const filtered = events.filter(
				(event) => event.sportType?.toLowerCase() === sportType.toLowerCase(),
			);
			setFilteredEvents(filtered);
		} else {
			setFilteredEvents(events);
		}
	};

	useEffect(() => {
		getEvents();
	}, []);

	useEffect(() => {
		filterEventsBySportType(sportType);
	}, [sportType, events]);

	return (
		<div className={styles.events_list}>
			{isLoading ? (
				<Loader />
			) : filteredEvents.length > 0 ? (
				<div className={styles.events_list__container}>
					{filteredEvents.map((event) => (
						<ListItem
							key={event.id}
							event={event}
						/>
					))}
				</div>
			) : (
				<p>Мероприятий не найдено</p>
			)}
		</div>
	);
};

export default EventsList;

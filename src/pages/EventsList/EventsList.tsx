import React, { useEffect, useState } from 'react';
import { EventsService } from 'api/EventsService/EventsService.ts';
import { Loader } from 'components/Loader/Loader.tsx';
import { showToast } from 'components/Toast/Toast.tsx';
import ListItem from './components/ListItem/ListItem';
import styles from './EventsList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectEvents,
	setEventsAction,
} from 'states/EventListState/EventListState.ts';
import useQueryParams from '../../hooks/useQueryParams.ts';

const EventsList: React.FC = () => {
	const events = useSelector(selectEvents);

	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { sportType, gameLevel, date, priceMin, priceMax, address } =
		useQueryParams();

	const eventsService = new EventsService();

	const getEvents = async () => {
		try {
			const evts = await eventsService.getFilteredEvents(
				sportType,
				gameLevel,
				date,
				priceMin,
				priceMax,
				address,
			);
			dispatch(setEventsAction(evts));
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

	useEffect(() => {
		getEvents();
	}, []);

	return (
		<div className={styles.events_list}>
			{isLoading ? (
				<Loader />
			) : events?.length > 0 ? (
				<div className={styles.events_list__container}>
					{events.map((event) => (
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

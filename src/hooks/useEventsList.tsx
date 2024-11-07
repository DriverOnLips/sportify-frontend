import {
	selectEvents,
	setEventsAction,
	deleteEventsAction,
} from '../states/EventListState/EventListState.ts';
import { showToast } from '../components/lib/Toast/Toast.tsx';
import useQueryParams from './useQueryParams.ts';
import { EventsService } from '../api/EventsService/EventsService.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const useEventsList = () => {
	const events = useSelector(selectEvents);
	const eventsService = new EventsService();

	const { sportType, gameLevel, date, priceMin, priceMax, address } =
		useQueryParams();

	const dispatch = useDispatch();

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

	const deleteEvents = () => {
		dispatch(deleteEventsAction());
	};

	useEffect(() => {
		getEvents();
	}, []);

	return { events, getEvents, deleteEvents };
};

export default useEventsList;

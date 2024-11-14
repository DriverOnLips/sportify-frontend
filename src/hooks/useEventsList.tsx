import {
	selectAllEvents,
	setAllEventsAction,
	deleteAllEventsAction,
	selectMyEvents,
	selectUpcomingEvents,
	selectPastEvents,
	setMyEventsAction,
	deleteMyEventsAction,
} from '../states/EventListState/EventListState.ts';
import { showToast } from '../components/lib/Toast/Toast.tsx';
import useQueryParams from './useQueryParams.ts';
import { EventsService } from '../api/EventsService/EventsService.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '../contexts/User/userContext.tsx';

const useEventsList = () => {
	const allEvents = useSelector(selectAllEvents);
	const myEvents = useSelector(selectMyEvents);
	const upcomingEvents = useSelector(selectUpcomingEvents);
	const pastEvents = useSelector(selectPastEvents);

	const { userId } = useUser();

	const eventsService = new EventsService();

	const { sportType, gameLevel, date, priceMin, priceMax, address } =
		useQueryParams();

	const dispatch = useDispatch();

	const getAllEvents = async () => {
		try {
			const evts = await eventsService.getEvents(
				sportType,
				gameLevel,
				date,
				priceMin,
				priceMax,
				address,
			);
			dispatch(setAllEventsAction(evts));
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

	const deleteAllEvents = () => {
		dispatch(deleteAllEventsAction());
	};

	const getMyEvents = async () => {
		try {
			const evts = await eventsService.getMyEvents(
				userId,
				sportType,
				gameLevel,
				date,
				priceMin,
				priceMax,
				address,
			);
			dispatch(setMyEventsAction(evts));
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

	const deleteMyEvents = () => {
		dispatch(deleteMyEventsAction());
	};

	return {
		allEvents,
		getAllEvents,
		deleteAllEvents,
		myEvents,
		getMyEvents,
		deleteMyEvents,
		upcomingEvents,
		pastEvents,
	};
};

export default useEventsList;

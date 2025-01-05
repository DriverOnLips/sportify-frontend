import React, { useEffect } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import AnnouncementsCarousel from './components/AnnouncementsCarousel/AnnouncementsCarousel';
import useEventsList from '../../hooks/useEventsList.ts';
import styles from './EventsList.module.scss';
import NewYearWidget from '../../assets/announcement/NewYearWidget.svg';
import TelegramBotWidget from '../../assets/announcement/TelegramBotWidget.svg';
import MapWidget from '../../assets/announcement/MapWidget.svg';
import EventCreateWidget from '../../assets/announcement/EventCreateWidget.svg';

const EventsList: React.FC = () => {
	const { allEvents, getAllEvents, deleteAllEvents } = useEventsList();

	const announcements = [
		{
			id: '1',
			image: NewYearWidget,
			link: '/map',
		},
		{
			id: '2',
			image: TelegramBotWidget,
			link: 'https://t.me/movelife_ond_bot',
		},
		{
			id: '3',
			image: MapWidget,
			link: '/map',
		},
		{
			id: '4',
			image: EventCreateWidget,
			link: '/events-create',
		},
	];

	useEffect(() => {
		getAllEvents();

		return () => deleteAllEvents();
	}, []);

	return (
		<div className={styles.events_wrapper}>
			<AnnouncementsCarousel announcements={announcements} />
			<div className={styles.events_list__container}>
				{allEvents.map((event) => (
					<ListItem
						key={event.id}
						event={event}
					/>
				))}
			</div>
		</div>
	);
};

export default EventsList;

import React, { useEffect, useState } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import AnnouncementsCarousel from './components/AnnouncementsCarousel/AnnouncementsCarousel';
import useEventsList from '../../hooks/useEventsList.ts';
import styles from './EventsList.module.scss';
import NewYearWidget from '../../assets/announcement/NewYearWidget.svg';
import TelegramBotWidget from '../../assets/announcement/TelegramBotWidget.svg';
import MapWidget from '../../assets/announcement/MapWidget.svg';
import EventCreateWidget from '../../assets/announcement/EventCreateWidget.svg';
import { Empty } from 'antd';
import { Loader } from '../../components/lib/Loader/Loader.tsx';


const EventsList: React.FC = () => {
	const { allEvents, getAllEvents, deleteAllEvents } = useEventsList();
	const [isLoaded, setIsLoaded] = useState(false);

	const loadAllEvents = async () => {
		await getAllEvents();
		setIsLoaded(true);
	};

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
		loadAllEvents();

		return () => deleteAllEvents();
	}, []);

	return (
		<div className={styles.events_wrapper}>
			<AnnouncementsCarousel announcements={announcements} />
			<div className={styles.events_list__container}>
				{isLoaded ? (
					allEvents.length > 0 ? (
						allEvents.map((event) => (
							<ListItem
								key={event.id}
								event={event}
							/>
						))
					) : (
						<Empty style={{ width: '100%' }} />
					)
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default EventsList;

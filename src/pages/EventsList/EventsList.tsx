import React, { useEffect } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import useEventsList from 'hooks/useEventsList.tsx';
import styles from './EventsList.module.scss';

const EventsList: React.FC = () => {
	const { allEvents, getAllEvents, deleteAllEvents } = useEventsList();

	useEffect(() => {
		getAllEvents();

		return () => deleteAllEvents();
	}, []);

	return (
		<div className={`${styles.events_list} events_list-js`}>
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

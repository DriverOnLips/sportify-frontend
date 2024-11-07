import React, { useEffect } from 'react';
import ListItem from './components/ListItem/ListItem';
import useEventsList from '../../hooks/useEventsList.tsx';
import styles from './EventsList.module.scss';

const EventsList: React.FC = () => {
	const { events, deleteEvents } = useEventsList();

	useEffect(() => {
		return () => deleteEvents();
	}, []);

	return (
		<div className={`${styles.events_list} events_list-js`}>
			<div className={styles.events_list__container}>
				{events.map((event) => (
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

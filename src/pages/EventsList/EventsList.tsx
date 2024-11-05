import React from 'react';
import ListItem from './components/ListItem/ListItem';
import styles from './EventsList.module.scss';
import useEventsList from '../../hooks/useEventsList.tsx';

const EventsList: React.FC = () => {
	const { events } = useEventsList();

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

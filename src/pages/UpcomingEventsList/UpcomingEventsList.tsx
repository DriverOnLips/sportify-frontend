import React, { useEffect } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import useEventsList from 'hooks/useEventsList.tsx';
import styles from './UpcomintEventsList.module.scss';

const UpcomingEventsList: React.FC = () => {
	const { upcomingEvents, getUpcomingEvents, deleteUpcomingEvents } =
		useEventsList();

	useEffect(() => {
		getUpcomingEvents();

		return () => deleteUpcomingEvents();
	}, []);

	return (
		<div className={`${styles.upcoming_events_list}`}>
			<div className={styles.upcoming_events_list__container}>
				{upcomingEvents.map((event) => (
					<ListItem
						key={event.id}
						event={event}
					/>
				))}
			</div>
		</div>
	);
};

export default UpcomingEventsList;
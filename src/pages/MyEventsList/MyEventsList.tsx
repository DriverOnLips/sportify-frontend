import React, { useEffect } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import useEventsList from 'hooks/useEventsList.tsx';
import styles from './MyEventsList.module.scss';

const MyEventsList: React.FC = () => {
	const { myEvents, getMyEvents, deleteMyEvents } = useEventsList();

	useEffect(() => {
		getMyEvents();

		return () => deleteMyEvents();
	}, []);

	return (
		<div className={`${styles.my_events_list}`}>
			<div className={styles.my_events_list__container}>
				{myEvents.map((event) => (
					<ListItem
						key={event.id}
						event={event}
					/>
				))}
			</div>
		</div>
	);
};

export default MyEventsList;

import React, { useEffect } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import useEventsList from '../../hooks/useEventsList.ts';
import styles from './MyEventsList.module.scss';
import useUserInfo from '../../hooks/useUserInfo.tsx';

const MyEventsList: React.FC = () => {
	const { user } = useUserInfo();
	const { myEvents, getMyEvents, deleteMyEvents } = useEventsList();

	useEffect(() => {
		getMyEvents(user!.id);

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

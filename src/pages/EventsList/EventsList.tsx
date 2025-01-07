import React, { useEffect, useState } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import useEventsList from '../../hooks/useEventsList.ts';
import styles from './EventsList.module.scss';
import { Empty } from 'antd';
import { Loader } from '../../components/lib/Loader/Loader.tsx';

const EventsList: React.FC = () => {
	const { allEvents, getAllEvents, deleteAllEvents } = useEventsList();
	const [isLoaded, setIsLoaded] = useState(false);

	const loadAllEvents = async () => {
		await getAllEvents();
		setIsLoaded(true);
	};

	useEffect(() => {
		loadAllEvents();

		return () => deleteAllEvents();
	}, []);

	return (
		<div className={`${styles.events_list} events_list-js`}>
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

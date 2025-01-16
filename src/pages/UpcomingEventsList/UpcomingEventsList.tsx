import React, { useEffect, useState } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import useEventsList from '../../hooks/useEventsList.ts';
import styles from './UpcomintEventsList.module.scss';
import useUserInfo from '../../hooks/useUserInfo.tsx';
import { Empty } from 'antd';
import { Loader } from '../../components/lib/Loader/Loader.tsx';

const UpcomingEventsList: React.FC = () => {
	const { user } = useUserInfo();
	const { upcomingEvents, getUpcomingEvents, deleteUpcomingEvents } =
		useEventsList();
	const [isLoaded, setIsLoaded] = useState(false);

	const loadUpcomingEvents = async () => {
		await getUpcomingEvents(user!.id);
		setIsLoaded(true);
	};

	useEffect(() => {
		loadUpcomingEvents();

		return () => deleteUpcomingEvents();
	}, [user]);

	return (
		<div className={`${styles.upcoming_events_list}`}>
			<div className={styles.upcoming_events_list__container}>
				{isLoaded ? (
					upcomingEvents.length > 0 ? (
						upcomingEvents.map((event) => (
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

export default UpcomingEventsList;

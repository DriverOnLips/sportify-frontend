import React, { useEffect, useState } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import useEventsList from '../../hooks/useEventsList.ts';
import styles from './MyEventsList.module.scss';
import useUserInfo from '../../hooks/useUserInfo.tsx';
import { Loader } from '../../components/lib/Loader/Loader.tsx';
import { Empty } from 'antd';

const MyEventsList: React.FC = () => {
	const { user } = useUserInfo();
	const { myEvents, getMyEvents, deleteMyEvents } = useEventsList();
	const [isLoaded, setIsLoaded] = useState(false);

	const loadMyEvents = async () => {
		await getMyEvents(user!.id);
		setIsLoaded(true);
	};

	useEffect(() => {
		loadMyEvents();

		return () => deleteMyEvents();
	}, [user]);

	return (
		<div className={`${styles.my_events_list}`}>
			<div className={styles.my_events_list__container}>
				{isLoaded ? (
					myEvents.length > 0 ? (
						myEvents.map((event) => (
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

export default MyEventsList;

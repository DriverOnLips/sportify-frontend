import React, { useEffect, useState } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import useEventsList from '../../hooks/useEventsList.ts';
import styles from './PastEventsList.module.scss';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { Empty } from 'antd';
import { Loader } from '../../components/lib/Loader/Loader.tsx';

const PastEventsList: React.FC = () => {
	const { user } = useUserInfo();
	const { pastEvents, getPastEvents, deletePastEvents } = useEventsList();
	const [isLoaded, setIsLoaded] = useState(false);

	const loadPastEvents = async () => {
		await getPastEvents(user!.id);
		setIsLoaded(true);
	};

	useEffect(() => {
		loadPastEvents();

		return () => deletePastEvents();
	}, [user]);

	return (
		<div className={`${styles.past_events_list}`}>
			<div className={styles.past_events_list__container}>
				{isLoaded ? (
					pastEvents.length > 0 ? (
						pastEvents.map((event) => (
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

export default PastEventsList;

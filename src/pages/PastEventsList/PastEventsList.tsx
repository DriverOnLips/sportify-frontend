import React, { useEffect } from 'react';
import ListItem from 'components/shared/ListItem/ListItem';
import useEventsList from '../../hooks/useEventsList.ts';
import styles from './PastEventsList.module.scss';
import useUserInfo from '../../hooks/useUserInfo.tsx';

const PastEventsList: React.FC = () => {
	const { user } = useUserInfo();
	const { pastEvents, getPastEvents, deletePastEvents } = useEventsList();

	useEffect(() => {
		getPastEvents(user!.id);

		return () => deletePastEvents();
	}, []);

	return (
		<div className={`${styles.past_events_list}`}>
			<div className={styles.past_events_list__container}>
				{pastEvents.map((event) => (
					<ListItem
						key={event.id}
						event={event}
					/>
				))}
			</div>
		</div>
	);
};

export default PastEventsList;

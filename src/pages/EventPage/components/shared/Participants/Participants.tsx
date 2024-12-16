import React from 'react';
import { UserShortInfoModel } from 'types/types/User/UserShortInfo.ts';
import Creator from '../Creator/Creator';
import styles from './Participants.module.scss';

type ParticipantsProps = {
	subscribers: UserShortInfoModel[];
};

const Participants: React.FC<ParticipantsProps> = ({ subscribers }) => {
	if (subscribers.length === 0) {
		return <p>Нет участников.</p>;
	}

	return (
		<div className={styles.participants}>
			<div className={styles.participants__list}>
				{subscribers.map((user) => (
					<Creator
						key={user.id}
						creator={user}
					/>
				))}
			</div>
		</div>
	);
};

export default Participants;

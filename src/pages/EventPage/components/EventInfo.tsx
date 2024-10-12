import React from 'react';
import { EventTypeModel } from '../../../types/types/EventType.ts';
import styles from './EventInfo.module.scss';
import {
	TeamOutlined,
	EnvironmentTwoTone,
	FieldTimeOutlined,
} from '@ant-design/icons';

interface EventInfoProps {
	event: EventTypeModel;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
	return (
		<div className={styles.eventInfo}>
			<div className={styles.eventType}>
				<span className={styles.sportType}> {event.sportType}</span>
			</div>
			<img
				src={event.preview}
				alt='Event Preview'
				className={styles.eventImage}
			/>
			<div className={styles.eventDetails}>
				<span className={styles.eventPrice}>
					{event.price} {event.isFree ? '(Бесплатно)' : ''}
				</span>
				<span className={styles.eventDescription}>
					Описание: {event.description}
				</span>
				<span className={styles.eventCapacity}>
					<TeamOutlined className={styles.icon} />
					{event.capacity - event.busy} / {event.capacity}
				</span>
				<span className={styles.eventAddress}>
					<EnvironmentTwoTone className={styles.icon} />
					Адрес: {event.address}
				</span>
				<span className={styles.eventDate}>
					<FieldTimeOutlined className={styles.icon} />
					Время проведения: {event.date}
				</span>
				<span className={styles.eventTime}>Start Time: {event.startTime}</span>
			</div>
		</div>
	);
};

export default EventInfo;

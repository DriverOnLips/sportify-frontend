import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EventTypeModel } from '../../../types/types/EventType.ts';
import styles from './EventInfo.module.scss';
import {
	TeamOutlined,
	EnvironmentTwoTone,
	FieldTimeOutlined,
	ArrowLeftOutlined,
} from '@ant-design/icons';
import Button from 'components/Button/Button.tsx';
import Text from 'components/Text/Text.tsx';
import { convertSportTypeToDisplayValue } from 'utils/converSportTypes.ts';


interface EventInfoProps {
	event: EventTypeModel;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
	const navigate = useNavigate();

	const handleRedirect = () => {
		navigate('/');
	};

	return (
		<div className={styles.eventInfo}>
			<div className={styles.eventType}>
				<Button
					className={styles.backButton}
					onClick={handleRedirect}
				>
					<ArrowLeftOutlined />
				</Button>
        <Text size={'s3'}>{convertSportTypeToDisplayValue(event.sportType)}</Text>
				<Button className={styles.registerButton}>Записаться</Button>
			</div>
			<img
				src={event.preview}
				alt='Event Preview'
				className={styles.eventImage}
			/>
			<div className={styles.eventDetails}>
				<span className={styles.eventPrice}>
          {event.isFree ? 'Бесплатно' : `${event.price} ₽`}
				</span>
				<span className={styles.eventDescription}>
					Описание:
					<br />
					{event.description}
				</span>
				<span className={styles.eventCapacity}>
					<TeamOutlined className={styles.icon} />
					{event.capacity - event.busy} / {event.capacity}
				</span>
				<span className={styles.eventAddress}>
					<EnvironmentTwoTone className={styles.icon} />
					Адрес:
					<br />
					{event.address}
				</span>
				<span className={styles.eventDate}>
					<FieldTimeOutlined className={styles.icon} />
					Время проведения:
					<br />
					{event.date}
				</span>
			</div>
		</div>
	);
};

export default EventInfo;

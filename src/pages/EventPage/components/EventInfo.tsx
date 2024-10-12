import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EventTypeModel } from '../../../types/types/EventType.ts';
import styles from './EventInfo.module.scss';
import {
	TeamOutlined,
	EnvironmentTwoTone,
	ArrowLeftOutlined,
} from '@ant-design/icons';
import Button from 'components/Button/Button.tsx';
import Text from '../../../components/Text/Text.tsx';
import { convertSportTypeToDisplayValue } from 'utils/converSportTypes.ts';
import SubButton from '../../EventsList/components/SubButton/SubButton.tsx';
import {useUser} from "../../../contexts/User/userContext.tsx";
import {formatDate, formatTime} from "../../../utils/formatTime.ts";

interface EventInfoProps {
	event: EventTypeModel;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
	const { userId } = useUser();

	const navigate = useNavigate();

	const handleRedirect = () => {
		navigate('/');
	};

	return (
		<div className={styles.eventInfo}>
			<div className={styles.eventType}>
				<Button
					onClick={handleRedirect}
				>
					<ArrowLeftOutlined />
				</Button>
				<Text
					size={'s3'}
					weight={'bold'}
				>
					{convertSportTypeToDisplayValue(event.sportType)}
				</Text>
				<SubButton
					disabled={event?.capacity ? event.capacity - event.busy > 0 : false}
					isSub={event.subscribersId?.includes(userId) ?? false}
					eventId={event.id}
				/>
			</div>
			<img
				src={event.preview}
				alt='Event Preview'
				className={styles.eventImage}
			/>
			<div className={styles.eventDetails}>
				<Text className={styles.eventPrice}>
					{event.isFree ? 'Бесплатно' : `${event.price} ₽`}
				</Text>
				<Text >
					Описание:
					<br />
					{event.description}
				</Text>
				{event.capacity ? (
					<Text>
						<TeamOutlined />
						{event.capacity - event.busy} / {event.capacity}
					</Text>
				) : (
					<Text>
						<TeamOutlined />
						{event.busy}
					</Text>
				)}
				<Text >
					<EnvironmentTwoTone className={styles.icon} />
					Адрес:
					<br />
					{event.address}
				</Text>
				<Text>
					{'Дата: '}
					{formatDate(event.date)}
				</Text>
				<Text>
					{'Начало: '}
					{formatTime(event.startTime)}
				</Text>
				{event.endTime && (
					<Text>
						{'Окончание: '}
						{formatTime(event.endTime)}
					</Text>
				)}
			</div>
		</div>
	);
};

export default EventInfo;

import {
	ArrowLeftOutlined,
	EnvironmentTwoTone,
	TeamOutlined,
	FieldTimeOutlined,
	DeleteOutlined,
	EditOutlined,
} from '@ant-design/icons';
import Button from 'components/Button/Button.tsx';
import Text from 'components/Text/Text.tsx';
import { useUser } from 'contexts/User/userContext.tsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EventTypeModel } from 'types/types/EventType.ts';
import { convertSportTypeToDisplayValue } from 'utils/converSportTypes.ts';
import { formatDate, formatTime } from 'utils/formatTime.ts';
import SubscribeButton from 'components/shared/SubscribeButton/SubscribeButton.tsx';
import styles from './EventInfo.module.scss';

interface EventInfoProps {
	event: EventTypeModel;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
	const { userId } = useUser();

	const navigate = useNavigate();

	const handleRedirect = () => {
		navigate('/');
	};

	const handleEdit = () => {
		console.log('Редактировать событие');
	};

	const handleDelete = () => {
		console.log('Удалить событие');
	};

	return (
		<div className={styles.eventInfo}>
			<div className={styles.eventType}>
				<Button onClick={handleRedirect}>
					<ArrowLeftOutlined />
				</Button>
				<div className={styles.eventDetails}>
					<Text
						size={'s4'}
						color={'primary'}
					>
						{convertSportTypeToDisplayValue(event.sportType)}
					</Text>
				</div>
				<SubscribeButton
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
				<Text
					size={'s4'}
					weight={'bold'}
					color={'primary'}
				>
					{event.isFree ? 'Бесплатно' : `${event.price} ₽`}
				</Text>
				<div className={styles.buttonsContainer}>
					<Button onClick={handleEdit}>
						<EditOutlined />
					</Button>
					<Button onClick={handleDelete}>
						<DeleteOutlined />
					</Button>
				</div>
				<Text
					size={'s6'}
					color={'secondary'}
				>
					<Text
						size={'s6'}
						weight={'bold'}
						color={'primary'}
					>
						Описание
					</Text>
					<br />
					{event.description}
				</Text>
				{event.capacity ? (
					<Text
						size={'s6'}
						weight={'bold'}
						color={'primary'}
					>
						<TeamOutlined />
						{event.capacity - event.busy} / {event.capacity}
					</Text>
				) : (
					<Text
						size={'s6'}
						weight={'bold'}
						color={'primary'}
					>
						<TeamOutlined />
						{event.busy}
					</Text>
				)}
				<Text
					size={'s6'}
					color={'secondary'}
				>
					<Text
						size={'s6'}
						weight={'bold'}
						color={'primary'}
					>
						<EnvironmentTwoTone className={styles.icon} />
						Адрес
					</Text>
					<br />
					{event.address}
				</Text>
				<Text
					size={'s6'}
					weight={'bold'}
					color={'primary'}
				>
					{'Дата: '}
					<br />
					<Text
						size={'s6'}
						color={'secondary'}
					>
						{formatDate(event.date)}
					</Text>
				</Text>
				<Text
					size={'s6'}
					weight={'bold'}
					color={'primary'}
				>
					<FieldTimeOutlined className={styles.icon} />
					{'Время проведения: '}
					<br />
					<Text
						size={'s6'}
						color={'secondary'}
					>
						{event.startTime ? formatTime(event.startTime) : '... '} —
						{event.endTime ? ' ' + formatTime(event.endTime) : ' ...'}
					</Text>
				</Text>
			</div>
		</div>
	);
};

export default EventInfo;

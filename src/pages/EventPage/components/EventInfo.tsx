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
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventInfoModel } from '../../../types/types/Event/EventInfo.ts';
import { convertSportTypeToDisplayValue } from 'utils/converSportTypes.ts';
import { formatDate, formatTime } from 'utils/formatTime.ts';
import SubscribeButton from 'components/shared/SubscribeButton/SubscribeButton.tsx';
import styles from './EventInfo.module.scss';

interface EventInfoProps {
	event: EventInfoModel;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
	const { userId } = useUser();
	const navigate = useNavigate();

	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedEvent, setEditedEvent] = useState<EventTypeModel>(event);

	useEffect(() => {
		const storedEvent = localStorage.getItem(`event_${event.id}`);
		if (storedEvent) {
			setEditedEvent(JSON.parse(storedEvent));
		} else {
			setEditedEvent(event);
		}
	}, [event]);

	const handleRedirect = () => {
		navigate('/');
	};

	const handleEdit = () => {
		setIsEditing(!isEditing);
		if (!isEditing) {
			navigate(`/event/${event.id}?edit`);
		}
	};

	const handleDelete = () => {
		console.log('Удалить событие');
	};

	const handleSave = () => {
		localStorage.setItem(`event_${event.id}`, JSON.stringify(editedEvent));
		setIsEditing(false);
		navigate(`/event/${event.id}`);
	};

	const handleChange = (updatedEvent: Partial<EventTypeModel>) => {
		const newEvent = { ...editedEvent, ...updatedEvent };
		setEditedEvent(newEvent);
		localStorage.setItem(`event_${event.id}`, JSON.stringify(newEvent));
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
				<div className={styles.eventPriceContainer}>
					{isEditing ? (
						<input
							type='text'
							value={
								editedEvent.isFree ? 'Бесплатно' : `${editedEvent.price ?? 0}`
							}
							onChange={(e) => {
								const isFree =
									e.target.value.trim().toLowerCase() === 'бесплатно';
								const price = isFree ? 0 : parseFloat(e.target.value) || 0;
								handleChange({ isFree, price });
							}}
						/>
					) : (
						<Text
							size={'s4'}
							weight={'bold'}
							color={'primary'}
						>
							{editedEvent.isFree ? 'Бесплатно' : `${editedEvent.price} ₽`}{' '}
						</Text>
					)}
					<div className={styles.buttonsContainer}>
						<Button onClick={isEditing ? handleSave : handleEdit}>
							{isEditing ? 'Сохранить' : <EditOutlined />}
						</Button>
						<Button onClick={handleDelete}>
							<DeleteOutlined />
						</Button>
					</div>
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
					{isEditing ? (
						<textarea
							value={editedEvent.description ?? ''}
							onChange={(e) => handleChange({ description: e.target.value })}
						/>
					) : (
						editedEvent.description
					)}
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
					{isEditing ? (
						<input
							type='text'
							value={editedEvent.address ?? ''}
							onChange={(e) => handleChange({ address: e.target.value })}
						/>
					) : (
						editedEvent.address
					)}
				</Text>
				<Text
					size={'s6'}
					weight={'bold'}
					color={'primary'}
				>
					{'Дата: '}
					<br />
					{isEditing ? (
						<input
							type='date'
							value={
								editedEvent.date
									? new Date(editedEvent.date).toISOString().split('T')[0]
									: ''
							}
							onChange={(e) => handleChange({ date: e.target.value })}
						/>
					) : (
						<Text
							size={'s6'}
							color={'secondary'}
						>
							{formatDate(editedEvent.date)}{' '}
						</Text>
					)}
				</Text>
				<Text
					size={'s6'}
					weight={'bold'}
					color={'primary'}
				>
					<FieldTimeOutlined className={styles.icon} />
					{'Время проведения: '}
					<br />
					{isEditing ? (
						<div>
							<input
								type='time'
								value={editedEvent.startTime ?? ''}
								onChange={(e) => handleChange({ startTime: e.target.value })}
							/>{' '}
							—
							<input
								type='time'
								value={editedEvent.endTime ?? ''}
								onChange={(e) => handleChange({ endTime: e.target.value })}
							/>
						</div>
					) : (
						<Text
							size={'s6'}
							color={'secondary'}
						>
							{event.startTime ? formatTime(event.startTime) : '...'} —
							{event.endTime ? ' ' + formatTime(event.endTime) : ' ...'}
						</Text>
					)}
				</Text>
			</div>
		</div>
	);
};

export default EventInfo;

import {
	ArrowLeftOutlined,
	EnvironmentTwoTone,
	TeamOutlined,
	FieldTimeOutlined,
	EditOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import Button from '../../../../components/Button/Button.tsx';
import Text from '../../../../components/Text/Text.tsx';
import { useUser } from '../../../../contexts/User/userContext.tsx';
import React, { useCallback, useMemo } from 'react';
import { EventInfoModel } from '../../../../types/types/Event/EventInfo.ts';
import { convertSportTypeToDisplayValue } from '../../../../utils/converSportTypes.ts';
import {
	formatDateDDMMMMYYYY,
	formatTime,
} from '../../../../utils/formatTime.ts';
import SubscribeButton from '../../../../components/shared/SubscribeButton/SubscribeButton.tsx';
import styles from './EventInfo.module.scss';
import { useNavigate } from 'react-router-dom';
import Image from '../../../../components/Image/Image.tsx';
import { showToast } from '../../../../components/Toast/Toast.tsx';
import { EventsService } from 'api/EventsService/EventsService.ts';

interface EventInfoProps {
	event: EventInfoModel;
}

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
	const { userId } = useUser();
	const navigate = useNavigate();
	const eventsService = new EventsService();

	const isCreator = useMemo(() => userId == event.creatorId, [userId, event]);

	const navigateToEvents = useCallback(() => navigate('/events'), [navigate]);

	const navigateToEventEdit = useCallback(
		() => navigate(`/events/${event.id}?edit=true`),
		[event],
	);

	const onDeleteButtonClick = async () => {
		try {
			await eventsService.deleteEvent(event.id, userId);
			showToast('success', 'Событие удалено');
			navigate('/events');
		} catch (error: any) {
			if (!error.message?.includes('EREQUESTPENDING')) {
				showToast(
					'error',
					'Ошибка',
					`Ошибка при удалении события: ${(error as Error).message}`,
				);
			}
		}
	};

	return (
		<div className={styles.event_info}>
			<div className={styles.event_info__type}>
				<Button onClick={navigateToEvents}>
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
				{isCreator ? (
					<>
						<Button onClick={navigateToEventEdit}>
							<EditOutlined />
						</Button>

						<Button
							type={'dashed'}
							onClick={onDeleteButtonClick}
						>
							<DeleteOutlined />
						</Button>
					</>
				) : (
					<SubscribeButton
						disabled={event?.capacity ? event.capacity - event.busy > 0 : false}
						isSub={!!event.subscribersId?.includes(userId)}
						eventId={event.id}
					/>
				)}
			</div>
			<Image
				src={event.preview}
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
				<Text
					size={'s6'}
					weight={'bold'}
					color={'primary'}
				>
					<TeamOutlined />
					{event.capacity
						? `${event.capacity - event.busy} / ${event.capacity}`
						: event.busy}
				</Text>
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
					{formatDateDDMMMMYYYY(event.date)}
				</Text>
				<Text
					size={'s6'}
					weight={'bold'}
					color={'primary'}
				>
					<FieldTimeOutlined className={styles.icon} />
					{'Время проведения: '}
					<br />
					{`${formatTime(event.startTime)} — ${event.endTime ? formatTime(event.endTime) : ''}`}
				</Text>
			</div>
		</div>
	);
};

export default EventInfo;

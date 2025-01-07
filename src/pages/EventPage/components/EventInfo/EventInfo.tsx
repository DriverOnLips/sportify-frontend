import {
	ArrowLeftOutlined,
	TeamOutlined,
	EditOutlined,
	DeleteOutlined,
	DollarOutlined,
	RiseOutlined,
	CalendarOutlined,
	EnvironmentOutlined,
	ClockCircleOutlined,
	FileTextOutlined,
} from '@ant-design/icons';
import Button from 'components/lib/Button/Button.tsx';
import Text from 'components/lib/Text/Text.tsx';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { EventInfoModel } from 'types/types/Event/EventInfo.ts';
import { convertSportTypeToDisplayValue } from 'utils/converSportTypes.ts';
import { formatDateDDMMMMYYYY } from 'utils/formatTime.ts';
import { useNavigate } from 'react-router-dom';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { EventsService } from 'api/EventsService/EventsService.ts';
import Tooltip from 'components/lib/Tooltip/Tooltip.tsx';
import { convertGameLevelToDisplayValue } from 'utils/convertGameLevels.ts';
import LabelValue from 'components/lib/LabelValue/LabelValue.tsx';
import { Divider } from 'antd';
import Carousel from './components/Carousel.tsx';
import { useScreenMode } from 'hooks/useScreenMode.ts';
import styles from './EventInfo.module.scss';
import useUserInfo from 'hooks/useUserInfo.tsx';
import Creator from '../shared/Creator/Creator.tsx';
import { formatTimeWithoutSeconds } from 'utils/formatTime.ts';
import PageSubscribeButton from 'components/shared/SubscribeButtons/PageSubsribeButton.tsx';
import Participants from '../shared/Participants/Participants.tsx';
import { UsersService } from 'api/UsersService/UsersService.ts';
import { UserShortInfoModel } from 'types/types/User/UserShortInfo.ts';

type EventInfoProps = {
	event: EventInfoModel;
};

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
	const { user, isAuthorized } = useUserInfo();
	const navigate = useNavigate();
	const eventsService = new EventsService();
	const usersService = new UsersService();

	const [currentEvent, setCurrentEvent] = useState<EventInfoModel>(event);
	const [participants, setParticipants] = useState<UserShortInfoModel[]>([]);

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 650;

	const isCreator = useMemo(
		() => user?.id === currentEvent.creator.id,
		[user, currentEvent],
	);

	useEffect(() => {
		const fetchParticipants = async () => {
			if (
				isAuthorized &&
				user?.id &&
				currentEvent.subscribersId?.includes(user.id)
			) {
				try {
					const participantsData = await Promise.all(
						currentEvent.subscribersId.map((subscriberId) =>
							usersService.getUserInfo(subscriberId),
						),
					);

					const participantsShortInfo = participantsData.map((p) => ({
						id: p.id,
						username: p.username,
						avatar: p.avatar,
						tgUrl: p.tgUrl,
					}));

					setParticipants(participantsShortInfo);
				} catch (error) {
					console.error('Ошибка при загрузке участников:', error);
				}
			} else {
				setParticipants([]);
			}
		};

		fetchParticipants();
	}, [currentEvent, user, isAuthorized, usersService]);

	const eventFields = [
		{
			label: <DollarOutlined />,
			value: `${currentEvent.price}₽`,
		},
		{
			label: <CalendarOutlined />,
			value: formatDateDDMMMMYYYY(currentEvent.date!),
		},
		{
			label: <ClockCircleOutlined />,
			value: `${formatTimeWithoutSeconds(currentEvent.startTime)} - ${formatTimeWithoutSeconds(currentEvent.endTime)}`,
		},
		{
			label: <RiseOutlined />,
			value:
				currentEvent.gameLevel.length > 0
					? currentEvent.gameLevel
							.map((level) => convertGameLevelToDisplayValue(level))
							.join(', ')
					: 'Любой',
		},
		{
			label: <EnvironmentOutlined />,
			value: currentEvent.address,
			itemMaxLines: 3,
		},
		{
			label: <TeamOutlined />,
			value: currentEvent.capacity
				? `${currentEvent.busy}/${currentEvent.capacity}`
				: currentEvent.busy.toString(),
		},
	];

	if (currentEvent.description) {
		eventFields.push({
			label: <FileTextOutlined />,
			value: currentEvent.description,
		});
	}

	const handleBackButtonClick = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	const navigateToEventEdit = useCallback(
		() => navigate(`/events/${currentEvent.id}?edit=true`),
		[currentEvent, navigate],
	);

	const onDeleteButtonClick = async () => {
		try {
			if (!isAuthorized || !user?.id) {
				showToast('info', 'Авторизуйтесь, чтобы продолжить');
				navigate('/login');
				return;
			}

			await eventsService.deleteEvent(currentEvent.id, user.id);
			showToast('success', 'Мероприятие удалено');
			navigate('/events');
		} catch (error: any) {
			if (!error.message?.includes('EREQUESTPENDING')) {
				showToast(
					'error',
					'Ошибка',
					`Ошибка при удалении мероприятия: ${(error as Error).message}`,
				);
			}
		}
	};

	return (
		<div className={styles.event_info}>
			<div className={styles.event_info__header}>
				{isWide && (
					<Button onClick={handleBackButtonClick}>
						<ArrowLeftOutlined />
					</Button>
				)}

				<Text
					className={styles.event_info__header_title}
					size={'s4'}
					weight={'bold'}
					color={'primary'}
				>
					{convertSportTypeToDisplayValue(currentEvent.sportType)}
				</Text>

				{isCreator && (
					<div className={styles.event_info__header_buttons}>
						<Tooltip
							title={'Редактировать'}
							placement={'bottom'}
						>
							<Button onClick={navigateToEventEdit}>
								<EditOutlined />
							</Button>
						</Tooltip>

						<Tooltip
							title={'Удалить'}
							placement={'bottom'}
						>
							<Button
								type={'dashed'}
								onClick={onDeleteButtonClick}
							>
								<DeleteOutlined />
							</Button>
						</Tooltip>
					</div>
				)}
			</div>
			<Divider className={styles.custom_divider} />
			<Carousel
				photos={currentEvent.photos}
				style={{ display: 'flex', justifyContent: 'center' }}
			/>
			<Divider className={styles.custom_divider} />

			<div className={styles.event_info__subscribe_button}>
				<PageSubscribeButton
					disabled={
						currentEvent?.capacity
							? currentEvent.busy >= currentEvent.capacity
							: false
					}
					isSub={
						user?.id !== undefined &&
						!!currentEvent.subscribersId?.includes(user.id)
					}
					eventId={currentEvent.id}
					onSubscriptionChange={(newSubscribersId) => {
						// Обновляем локальный стейт event
						setCurrentEvent((prev) => ({
							...prev,
							subscribersId: newSubscribersId,
						}));
					}}
				/>
			</div>

			<LabelValue items={eventFields} />

			<div className={styles.event_info__creator}>
				<Text
					size={'s6'}
					color={'primary'}
				>
					Создатель:{' '}
				</Text>
				<Creator creator={currentEvent.creator} />
			</div>

			{(user?.id === currentEvent.creator.id ||
				(user?.id !== undefined &&
					currentEvent.subscribersId?.includes(user.id))) && (
				<div className={styles.event_info__participants}>
					<Text
						size={'s6'}
						color={'primary'}
					>
						Участники:
					</Text>
					{participants.length > 0 ? (
						<Participants participants={participants} />
					) : (
						<Text size={'s6'}>Нет участников</Text>
					)}
				</div>
			)}
		</div>
	);
};

export default EventInfo;

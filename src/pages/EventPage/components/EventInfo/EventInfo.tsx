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

	const [participants, setParticipants] = useState<UserShortInfoModel[]>([]);

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 650;

	const isCreator = useMemo(() => user?.id === event.creator.id, [user, event]);

	useEffect(() => {
		const fetchParticipants = async () => {
			if (isAuthorized && user?.id && event.subscribersId?.includes(user.id)) {
				try {
					const participantsData = await Promise.all(
						event.subscribersId.map((subscriberId) =>
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
	}, [event, user, isAuthorized, usersService]);

	const eventFields = [
		{
			label: <DollarOutlined />,
			value: `${event.price}₽`,
		},
		{
			label: <CalendarOutlined />,
			value: formatDateDDMMMMYYYY(event.date!),
		},
		{
			label: <ClockCircleOutlined />,
			value: `${formatTimeWithoutSeconds(event.startTime)} - ${formatTimeWithoutSeconds(event.endTime)}`, // строка
		},
		{
			label: <RiseOutlined />,
			value:
				event.gameLevel.length > 0
					? event.gameLevel
							.map((level) => convertGameLevelToDisplayValue(level))
							.join(', ')
					: 'Любой',
		},
		{ label: <EnvironmentOutlined />, value: event.address, itemMaxLines: 3 },
		{
			label: <TeamOutlined />,
			value: event.capacity
				? `${event.busy}/${event.capacity}`
				: event.busy.toString(),
		},
	];

	if (event.description) {
		eventFields.push({
			label: <FileTextOutlined />,
			value: event.description,
		});
	}

	const handleBackButtonClick = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	const navigateToEventEdit = useCallback(
		() => navigate(`/events/${event.id}?edit=true`),
		[event, navigate],
	);

	const onDeleteButtonClick = async () => {
		try {
			if (!isAuthorized || !user?.id) {
				showToast('info', 'Авторизуйтесь, чтобы продолжить');
				navigate('/login');
				return;
			}

			await eventsService.deleteEvent(event.id, user.id);
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
					{convertSportTypeToDisplayValue(event.sportType)}
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
				photos={event.photos}
				style={{ display: 'flex', justifyContent: 'center' }}
			/>
			<Divider className={styles.custom_divider} />

			<div className={styles.event_info__subscribe_button}>
				<PageSubscribeButton
					disabled={event?.capacity ? event.busy >= event.capacity : false}
					isSub={
						user?.id !== undefined && !!event.subscribersId?.includes(user.id)
					}
					eventId={event.id}
				/>
			</div>

			<LabelValue items={eventFields} />

			<div className={styles.event_info__creator}>
				<Text color={'primary'}>Создатель: </Text>
				<Creator creator={event.creator} />
			</div>

			<div className={styles.event_info__participants}>
				<Text color={'primary'}>Участники:</Text>
				{participants.length > 0 ? (
					<Participants participants={participants} />
				) : (
					<Text>Нет участников</Text>
				)}
			</div>
		</div>
	);
};

export default EventInfo;

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
import React, { useCallback, useMemo } from 'react';
import { EventInfoModel } from 'types/types/Event/EventInfo.ts';
import { convertSportTypeToDisplayValue } from 'utils/converSportTypes.ts';
import { formatDateDDMMMMYYYY } from 'utils/formatTime.ts';
import SubscribeButton from 'components/shared/SubscribeButton/SubscribeButton.tsx';
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

type EventInfoProps = {
	event: EventInfoModel;
};

const EventInfo: React.FC<EventInfoProps> = ({ event }) => {
	const { user, isAuthorized } = useUserInfo();
	const navigate = useNavigate();
	const eventsService = new EventsService();

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 650;

	const isCreator = useMemo(() => user?.id == event.creator.id, [user, event]);

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
			value: `${event.startTime!} - ${event.endTime!} `,
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
		{
			...(event.description && {
				label: <FileTextOutlined />,
				value: event.description,
			}),
		},
	];

	const handleBackButtonClick = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	const navigateToEventEdit = useCallback(
		() => navigate(`/events/${event.id}?edit=true`),
		[event],
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

	// @ts-ignore
	return (
		<div className={styles.event_info}>
			<div className={styles.event_info__header}>
				{isWide && (
					<Button onClick={handleBackButtonClick}>
						<ArrowLeftOutlined />
					</Button>
				)}

				<Text
					size={'s3'}
					weight={'bold'}
					color={'primary'}
				>
					{convertSportTypeToDisplayValue(event.sportType)}
				</Text>

				{isCreator ? (
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
				) : (
					<SubscribeButton
						disabled={event?.capacity ? event.busy >= event.capacity : false}
						isSub={
							user?.id !== undefined && !!event.subscribersId?.includes(user.id)
						}
						eventId={event.id}
					/>
				)}
			</div>
			<Divider />
			<Carousel
				photos={event.photos}
				style={{ display: 'flex', justifyContent: 'center' }}
			/>
			<Divider />

			{/* @ts-ignore */}
			<LabelValue items={eventFields} />

			<div className={styles.event_info__creator}>
				<Text color={'primary'}>Создатель: </Text>
				{JSON.stringify(event.creator)}
				<Creator creator={event.creator} />
			</div>
		</div>
	);
};

export default EventInfo;

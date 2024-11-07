import { TeamOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from 'components/lib/Text/Text.tsx';
import { useUser } from 'contexts/User/userContext.tsx';
import { EventShortInfoModel } from 'types/types/Event/EventShortInfo.ts';
import { convertSportTypeToDisplayValue } from 'utils/converSportTypes.ts';
import { convertGameLevelToDisplayValue } from 'utils/convertGameLevels.ts';
import { formatDateDDMMMMYYYY, formatTime } from 'utils/formatTime.ts';
import SubscribeButton from 'components/shared/SubscribeButton/SubscribeButton.tsx';
import styles from './ListItem.module.scss';
import LabelValue from 'components/lib/LabelValue/LabelValue.tsx';

const ListItem: React.FC<{ event: EventShortInfoModel }> = ({ event }) => {
	const { userId } = useUser();

	const navigate = useNavigate();

	const onItemClick = useCallback(() => {
		navigate(`/events/${event.id}`);
	}, []);

	const fields = [
		{
			label: 'Дата',
			value: formatDateDDMMMMYYYY(event.date),
		},
		{ label: 'Адрес', value: event.address },
		{ label: 'Начало', value: formatTime(event.startTime) },
		{ label: 'Окончание', value: formatTime(event.endTime) },
		{
			label: 'Стоимость',
			value: `${event.price}₽ ${event.isFree ? '(Бесплатно)' : ''}`,
		},
		{
			label: 'Участники',
			value: event.capacity ? (
				<>
					<TeamOutlined />
					{event.busy} / {event.capacity}
				</>
			) : (
				<>
					<TeamOutlined />
					{event.busy}
				</>
			),
		},
		{
			label: 'Уровень игры',
			value: event.gameLevel
				.map((level) => convertGameLevelToDisplayValue(level))
				.join(', '),
		},
	];

	return (
		<Card
			className={styles.list_item}
			hoverable
			cover={
				<img
					className={styles.list_item__img}
					src={event.preview}
				/>
			}
			onClick={onItemClick}
		>
			<div className={styles.list_item__content}>
				<Text
					size={'s3'}
					weight={'bold'}
				>
					{convertSportTypeToDisplayValue(event.sportType)}
				</Text>

				<LabelValue items={fields} />
			</div>

			<SubscribeButton
				isSub={event.subscribersId?.includes(userId) ?? false}
				eventId={event.id}
				disabled={event?.capacity ? event.busy >= event.capacity : false}
			/>
		</Card>
	);
};

export default ListItem;

import { TeamOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from 'components/Text/Text.tsx';
import { useUser } from 'contexts/User/userContext.tsx';
import { EventShortInfoModel } from '../../../../types/types/Event/EventShortInfo.ts';
import { convertSportTypeToDisplayValue } from 'utils/converSportTypes.ts';
import { convertGameLevelToDisplayValue } from 'utils/convertGameLevels.ts';
import { formatDate, formatTime } from 'utils/formatTime.ts';
import SubscribeButton from 'components/shared/SubscribeButton/SubscribeButton.tsx';
import styles from './ListItem.module.scss';

const ListItem: React.FC<{ event: EventShortInfoModel }> = ({ event }) => {
	const { userId } = useUser();

	const navigate = useNavigate();

	const onItemClick = useCallback(() => {
		navigate(`/event/${event.id}`);
	}, []);

	return (
		<Card
			hoverable
			cover={
				<img
					alt='example'
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
				<Text className={styles.list_item__content__address}>
					{'Адрес: '}
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
				<Text>
					{event.price + ' ₽'} {event.isFree ? '(Бесплатно)' : ''}
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
				{event.gameLevel && (
					<Text>{convertGameLevelToDisplayValue(event.gameLevel)}</Text>
				)}
			</div>
			<SubscribeButton
				isSub={event.subscribersId?.includes(userId) ?? false}
				eventId={event.id}
				disabled={event?.capacity ? event.capacity - event.busy > 0 : false}
			/>
		</Card>
	);
};

export default ListItem;

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
import PayButton from 'components/shared/PayButton/PayButton';
import styles from './ListItem.module.scss';

const ListItem: React.FC<{ event: EventShortInfoModel }> = ({ event }) => {
	const { userId } = useUser();

	const navigate = useNavigate();

	const onItemClick = useCallback(() => {
		navigate(`/events/${event.id}`);
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
					<Text
						size={'s5'}
						weight={'bold'}
						color={'primary'}
					>
						{'Адрес: '}
					</Text>
					{event.address}
				</Text>
				<Text>
					<Text
						size={'s5'}
						weight={'bold'}
						color={'primary'}
					>
						{'Дата: '}
					</Text>
					{formatDateDDMMMMYYYY(event.date)}
				</Text>
				<Text>
					<Text
						size={'s5'}
						weight={'bold'}
						color={'primary'}
					>
						{'Начало: '}
					</Text>
					{formatTime(event.startTime)}
				</Text>
				{event.endTime && (
					<Text>
						<Text
							size={'s5'}
							weight={'bold'}
							color={'primary'}
						>
							{'Окончание: '}
						</Text>
						{formatTime(event.endTime)}
					</Text>
				)}
				<Text>
					{event.price + ' ₽'} {event.isFree ? '(Бесплатно)' : ''}
				</Text>
				{event.capacity ? (
					<Text>
						<TeamOutlined />
						{event.busy} / {event.capacity}
					</Text>
				) : (
					<Text>
						<TeamOutlined />
						{event.busy}
					</Text>
				)}

				{event.gameLevel && (
					<Text>
						{event.gameLevel
							.map((level) => convertGameLevelToDisplayValue(level))
							.join(', ')}
					</Text>
				)}
			</div>
			{event.price > 0 ? (
				<PayButton
					isSub={event.subscribersId?.includes(userId) ?? false}
					eventId={event.id}
					disabled={event?.capacity ? event.busy >= event.capacity : false}
				/>
			) : (
				<SubscribeButton
					isSub={event.subscribersId?.includes(userId) ?? false}
					eventId={event.id}
					disabled={event?.capacity ? event.busy >= event.capacity : false}
				/>
			)}
		</Card>
	);
};

export default ListItem;

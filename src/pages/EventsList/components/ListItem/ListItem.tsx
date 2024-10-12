import { EventFromListModel } from '../../../../types/types/EventFromList.ts';
import styles from './ListItem.module.scss';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'antd';
import Text from '../../../../components/Text/Text.tsx';
import { convertSportTypeToDisplayValue } from '../../../../utils/converSportTypes.ts';
import { convertGameLevelToDisplayValue } from '../../../../utils/convertGameLevels.ts';
import { TeamOutlined } from '@ant-design/icons';
import { formatDate, formatTime } from '../../../../utils/formatTime.ts';
import SubButton from '../SubButton/SubButton.tsx';

const ListItem: React.FC<{ event: EventFromListModel }> = ({ event }) => {
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
				{event.capacity && (
					<Text>
						<TeamOutlined />
						{event.capacity - event.busy} / {event.capacity}
					</Text>
				)}
				{event.gameLevel && (
					<Text>{convertGameLevelToDisplayValue(event.gameLevel)}</Text>
				)}
			</div>
			<SubButton
				disabled={event?.capacity ? event.capacity - event.busy > 0 : false}
				isSub={event.subscribersId?.includes(userId) ?? false}
			/>
		</Card>
	);
};

export default ListItem;

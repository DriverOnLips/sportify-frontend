import { TeamOutlined, LeftOutlined } from '@ant-design/icons';
import { Card, Collapse } from 'antd';
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

	const fieldsPath1 = [
		{
			label: 'Дата',
			value: formatDateDDMMMMYYYY(event.date),
		},
		{ label: 'Адрес', value: event.address },
	];

	const fieldsPath2 = [
		{ label: 'Начало', value: formatTime(event.startTime) },
		{ label: 'Окончание', value: formatTime(event.endTime) },
		{
			label: 'Стоимость',
			value: `${event.price}₽`,
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
			label: 'Уровень',
			value: event.gameLevel
				.map((level) => convertGameLevelToDisplayValue(level))
				.join(', '),
		},
	];

	return (
		<Collapse
			bordered={false}
			expandIcon={({ isActive }) => (
				<LeftOutlined
					// color={'#1677ff'}
					rotate={isActive ? -90 : 0}
					style={{ fontSize: '24px !important' }}
				/>
			)}
			items={[
				{
					key: '1',
					label: (
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

								<LabelValue items={fieldsPath1} />
							</div>
						</Card>
					),
					children: (
						<>
							<div className={styles.list_item__content}>
								<LabelValue items={fieldsPath2} />
							</div>

							<SubscribeButton
								isSub={event.subscribersId?.includes(userId) ?? false}
								eventId={event.id}
								disabled={
									event?.capacity ? event.busy >= event.capacity : false
								}
							/>
						</>
					),
				},
			]}
		/>
	);
};

export default ListItem;

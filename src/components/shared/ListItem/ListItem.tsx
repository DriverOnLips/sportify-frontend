import {
	TeamOutlined,
	LeftOutlined,
	ClockCircleOutlined,
	CalendarOutlined,
	EnvironmentOutlined,
	RiseOutlined,
	CheckCircleOutlined,
} from '@ant-design/icons';
import { Card, Collapse } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Text from '../../lib/Text/Text.tsx';
import { EventShortInfoModel } from 'types/types/Event/EventShortInfo.ts';
import { convertSportTypeToDisplayValue } from 'utils/converSportTypes.ts';
import { convertGameLevelToDisplayValue } from 'utils/convertGameLevels.ts';
import { formatDateDDMMMMYYYY } from 'utils/formatTime.ts';
import SubscribeButton from '../SubscribeButtons/SubscribeButton.tsx';
import styles from './ListItem.module.scss';
import LabelValue from '../../lib/LabelValue/LabelValue.tsx';
import Tooltip from '../../lib/Tooltip/Tooltip.tsx';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { formatTimeWithoutSeconds } from 'utils/formatTime.ts';
import { GAME_LEVELS_COUNT } from 'types/enums/GameLevels.ts';

const ListItem: React.FC<{ event: EventShortInfoModel }> = ({ event }) => {
	const { user } = useUserInfo();

	const isSubscribed =
		(user?.id && event.subscribersId?.includes(user.id)) || false;

	const navigate = useNavigate();

	const onItemClick = useCallback(() => {
		navigate(`/events/${event.id}`);
	}, []);

	const leftField = [
		{
			label: <TeamOutlined />,
			value: event.capacity ? `${event.busy}/${event.capacity}` : event.busy,
		},
	];

	const rightField = [
		{
			label: null,
			value: `${event.price}₽`,
		},
	];

	const fieldsPath1 = [
		{
			label: <CalendarOutlined />,
			value: formatDateDDMMMMYYYY(event.date!),
		},
		{ label: <EnvironmentOutlined />, value: event.address },
		{
			label: <ClockCircleOutlined />,
			value: `${formatTimeWithoutSeconds(event.startTime)} - ${formatTimeWithoutSeconds(event.endTime)} `,
		},
		{
			label: <RiseOutlined />,
			value:
				event.gameLevel.length > 0 &&
				event.gameLevel.length !== GAME_LEVELS_COUNT ? (
					<Text
						size={'s6'}
						maxLines={2}
					>
						{event.gameLevel
							.map((level) => convertGameLevelToDisplayValue(level))
							.join(', ')}
					</Text>
				) : (
					'Любой'
				),
		},
	];

	return (
		<Collapse
			bordered={false}
			expandIcon={({ isActive }) => (
				<LeftOutlined
					rotate={isActive ? -90 : 0}
					style={{ fontSize: '24px !important' }}
				/>
			)}
			items={[
				{
					key: '1',
					showArrow: false,
					label: (
						<Card
							className={styles.list_item}
							hoverable
							cover={
								<img
									className={styles.list_item__img}
									src={event.preview}
									alt={''}
								/>
							}
							onClick={onItemClick}
						>
							<div className={styles.list_item__img_text_left}>
								<LabelValue items={leftField} />
							</div>

							<div className={styles.list_item__img_text_right}>
								<LabelValue items={rightField} />
							</div>

							<div className={styles.list_item__content}>
								<div className={styles.list_item__content_header}>
									<div className={styles.list_item__content_header_sport}>
										<Text
											size={'s5'}
											weight={'bold'}
										>
											{convertSportTypeToDisplayValue(event.sportType)}
										</Text>

										{event.creatorId === user?.id && (
											<Tooltip title={'Это мероприятие создано вами'}>
												<CheckCircleOutlined
													onClick={(e) => e.stopPropagation()}
												/>
											</Tooltip>
										)}
									</div>

									<SubscribeButton
										isSub={isSubscribed}
										eventId={event.id}
										disabled={
											event?.capacity ? event.busy >= event.capacity : false
										}
									/>
								</div>

								<LabelValue items={fieldsPath1} />
							</div>
						</Card>
					),
					// children: (
					// 		<div className={styles.list_item__content}>
					// 			<LabelValue items={fieldsPath2} />
					// 		</div>
					// ),
				},
			]}
		/>
	);
};

export default ListItem;

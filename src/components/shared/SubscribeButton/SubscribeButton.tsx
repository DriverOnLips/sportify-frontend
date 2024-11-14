import React from 'react';
import { EventsService } from 'api/EventsService/EventsService.ts';
import Button from 'components/lib/Button/Button.tsx';
import { useUser } from 'contexts/User/userContext.tsx';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import Tooltip from '../../lib/Tooltip/Tooltip.tsx';

type Props = {
	isSub: boolean;
	eventId: string;
	disabled?: boolean;
};

const SubscribeButton: React.FC<Props> = ({ isSub, eventId, disabled }) => {
	const { userId } = useUser();

	const eventsService = new EventsService();

	const handleClick = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		setLoading(true);

		try {
			const response = await eventsService.subscribeOnEvent(
				eventId,
				userId,
				!isSubscribed,
			);
			const newIsSubscribed = response.subscribers_id?.includes(userId);
			setIsSubscribed(newIsSubscribed);
			showToast(
				'success',
				`Вы ${newIsSubscribed ? 'записались на мероприятие' : 'отписались от мероприятия'}`,
			);
		} catch (e) {
			showToast(
				'error',
				'Ошибка',
				`Ошибка при получении данных: ${(e as Error).message}`,
			);
		} finally {
			setLoading(false);
		}
	};

	const [loading, setLoading] = React.useState<boolean>(false);
	const [isSubscribed, setIsSubscribed] = React.useState(isSub);

	return (
		<Tooltip title={isSubscribed ? 'Отписаться' : 'Подписаться'}>
			<Button
				onClick={handleClick}
				type={isSubscribed ? 'default' : 'primary'}
				loading={loading}
				disabled={disabled}
			>
				{isSubscribed ? <UserDeleteOutlined /> : <UserAddOutlined />}
			</Button>
		</Tooltip>
	);
};

export default React.memo(SubscribeButton);

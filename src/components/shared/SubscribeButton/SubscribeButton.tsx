import React from 'react';
import { EventsService } from 'api/EventsService/EventsService.ts';
import Button from 'components/lib/Button/Button.tsx';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import Tooltip from '../../lib/Tooltip/Tooltip.tsx';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { useNavigate } from 'react-router-dom';

type Props = {
	isSub: boolean;
	eventId: string;
	disabled?: boolean;
};

const SubscribeButton: React.FC<Props> = ({ isSub, eventId, disabled }) => {
	const { user, isAuthorized } = useUserInfo();

	const navigate = useNavigate();

	const eventsService = new EventsService();

	const handleClick = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();

		if (!isAuthorized || !user?.id) {
			showToast('info', 'Авторизуйтесь, чтобы продолжить');
			navigate('/login');

			return;
		}

		setLoading(true);

		try {
			const response = await eventsService.subscribeOnEvent(
				eventId,
				user.id,
				!isSubscribed,
			);
			const newIsSubscribed = response.subscribers_id?.includes(user.id);
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

import React, { useEffect, useState } from 'react';
import { EventsService } from 'api/EventsService/EventsService.ts';
import Button from 'components/lib/Button/Button.tsx';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { useNavigate } from 'react-router-dom';

type Props = {
	isSub: boolean;
	eventId: string;
	disabled?: boolean;
	onSubscriptionChange?: (newSubscribersId: string[]) => void;
};

const SubscribeButton: React.FC<Props> = ({
	isSub,
	eventId,
	disabled,
	onSubscriptionChange,
}) => {
	const { user, isAuthorized } = useUserInfo();

	const navigate = useNavigate();

	const eventsService = new EventsService();

	const [loading, setLoading] = useState<boolean>(false);
	const [isSubscribed, setIsSubscribed] = useState<boolean>(isSub);

	useEffect(() => {
		setIsSubscribed(isSub);
	}, [isSub]);

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
			onSubscriptionChange?.(response.subscribers_id);

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

	return (
		<Button
			onClick={handleClick}
			type={isSubscribed ? 'default' : 'primary'}
			loading={loading}
			disabled={disabled}
		>
			{isSubscribed ? 'Отписаться' : 'Записаться'}
		</Button>
	);
};

export default SubscribeButton;

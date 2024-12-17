import React, { useEffect, useState } from 'react';
import { EventsService } from 'api/EventsService/EventsService.ts';
import Button from 'components/lib/Button/Button.tsx';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import Tooltip from '../../lib/Tooltip/Tooltip.tsx';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setNumOfSubscribersToEventFromListAction } from '../../../states/EventListState/EventListState.ts';

type Props = {
	isSub: boolean;
	eventId: string;
	disabled?: boolean;
};

const SubscribeButton: React.FC<Props> = ({ isSub, eventId, disabled }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isAuthorized } = useUserInfo();

	const eventsService = new EventsService();

	const [loading, setLoading] = useState<boolean>(false);
	const [isSubscribed, setIsSubscribed] = useState<boolean>(isSub);

	// TODO: нафиг снести это и сделать так, чтобы остальные запросы шли только после того,
	// как мы узнали статус авторизации. Возможное решение: через serviceBase
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
			const numOfSubscribers = response.busy;

			setIsSubscribed(newIsSubscribed);
			dispatch(
				setNumOfSubscribersToEventFromListAction({ eventId, numOfSubscribers }),
			);

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

export default SubscribeButton;

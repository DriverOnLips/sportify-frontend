import React from 'react';
import { EventsService } from 'api/EventsService/EventsService.ts';
import Button from 'components/Button/Button.tsx';
import { useUser } from 'contexts/User/userContext.tsx';
import { showToast } from 'components/Toast/Toast.tsx';

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

		// Функция для задержки
		const delay = (ms: number) =>
			new Promise((resolve) => setTimeout(resolve, ms));

		await delay(1000);

		try {
			const response = await eventsService.subscribeOnEvent(
				eventId,
				userId,
				!isSubscribed,
			);
			setIsSubscribed(response.subscribers_id?.includes(userId) || false);
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
		<>
			<Button
				onClick={handleClick}
				type={isSubscribed ? 'default' : 'primary'}
				loading={loading}
				disabled={disabled}
			>
				{isSubscribed ? 'Отписаться' : 'Записаться'}
			</Button>
		</>
	);
};

export default React.memo(SubscribeButton);

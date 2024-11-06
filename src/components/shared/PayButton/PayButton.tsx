import React from 'react';
import { EventsService } from 'api/EventsService/EventsService.ts';
import Button from 'components/lib/Button/Button.tsx';
import { useUser } from 'contexts/User/userContext.tsx';
import { showToast } from 'components/lib/Toast/Toast.tsx';

type Props = {
	isSub: boolean;
	eventId: string;
	disabled?: boolean;
};

const PayButton: React.FC<Props> = ({ isSub, eventId, disabled }) => {
	const { userId } = useUser();
	const eventsService = new EventsService();
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isSubscribed, setIsSubscribed] = React.useState(isSub);

	const handleClick = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.stopPropagation();
		if (!userId) {
			showToast('error', 'Ошибка', 'Необходимо войти в систему');
			return;
		}

		setLoading(true);

		try {
			const response = await eventsService.payForEvent(eventId, userId);

			setIsSubscribed(true);

			if (response?.confirmation_url) {
				window.location.href = response.confirmation_url;
			} else {
				showToast(
					'error',
					'Ошибка',
					'Не удалось получить ссылку для подтверждения оплаты',
				);
				setIsSubscribed(false);
			}
		} catch (e) {
			showToast(
				'error',
				'Ошибка',
				`Ошибка при обработке платежа: ${(e as Error).message}`,
			);
			setIsSubscribed(false);
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
			{isSubscribed ? 'Вы записаны' : 'Оплатить'}
		</Button>
	);
};

export default React.memo(PayButton);

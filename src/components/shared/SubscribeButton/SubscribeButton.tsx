import React from 'react';
import { EventsService } from 'api/EventsService/EventsService.ts';
import Button from 'components/lib/Button/Button.tsx';
import { useUser } from 'contexts/User/userContext.tsx';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';

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
				{isSubscribed ? <UserDeleteOutlined /> : <UserAddOutlined />}
			</Button>
		</>
	);
};

export default React.memo(SubscribeButton);

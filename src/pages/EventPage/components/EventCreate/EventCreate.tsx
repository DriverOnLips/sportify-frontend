import React, { useState } from 'react';
import AddressInput from '../shared/AddressInput/AddressInput.tsx';
import SportsTypeSelect from '../shared/SportTypeSelect/SportTypeSelect.tsx';
import EventDatePicker from '../shared/DatePicker/DatePicker.tsx';
import EventTimePicker from '../shared/TimePicker/TimePicker.tsx';
import PriceInput from '../shared/PriceInput/PriceInput.tsx';
import GameLevelSelect from '../shared/GameLevelSelect/GameLevelSelect.tsx';
import CapacityInput from '../shared/CapacityInput/CapacityInput.tsx';
import EventUploadImages from '../shared/UploadImages/UploadImages.tsx';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';
import Text from 'components/lib/Text/Text.tsx';
import Button from 'components/lib/Button/Button.tsx';
import { EventsService } from 'api/EventsService/EventsService.ts';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { useNavigate } from 'react-router-dom';
import styles from './EventCreate.module.scss';
import { Divider } from 'antd';
import Explanation from 'components/lib/Explanation/Explanation.tsx';
import DescriptionInput from '../shared/DescriptionInput/DescriptionInput.tsx';
import { useSelector } from 'react-redux';
import {
	selectTGWebAppUserId,
	selectTGWebAppChatId,
} from 'states/TGWebApp/TGWebAppState.ts';
import { BackgroundGradientAnimation } from 'components/lib/BackgroundAnimation/BackgroundAnimation.tsx';
import useVibration from 'hooks/useVibration.tsx';
import useUserInfo from 'hooks/useUserInfo.tsx';

const EventCreate: React.FC = () => {
	const tgUserId = useSelector(selectTGWebAppUserId);
	const tgChatId = useSelector(selectTGWebAppChatId);

	const { user, isAuthorized } = useUserInfo();

	const navigate = useNavigate();

	if (!isAuthorized || !user?.id) {
		showToast('info', 'Авторизуйтесь, чтобы продолжить');
		navigate('/login');

		return <></>;
	}

	const eventsService = new EventsService();

	const [eventToCreate, setEventToCreate] = useState<EventCreateModel | null>(
		null,
	);

	const changeEventField = (field: Partial<EventCreateModel>) => {
		setEventToCreate((prev) => ({ ...prev, ...field }));
	};

	const onButtonClick = async () => {
		if (!eventToCreate) {
			return;
		}

		try {
			let tg;
			if (tgUserId !== '' && tgChatId !== '') {
				tg = {
					user_id: tgUserId,
					chat_id: tgChatId,
				};
			}

			const createdEvent = await eventsService.createEvent(
				eventToCreate,
				user.id,
				tg,
			);
			showToast('success', 'Мероприятие успешно создано');
			navigate(`/events/${createdEvent.id}`);
		} catch (error: any) {
			useVibration([100]);

			if (!error.message?.includes('EREQUESTPENDING')) {
				showToast(
					'error',
					'Ошибка',
					`Ошибка при получении данных: ${(error as Error).message}`,
				);
			}
		}
	};

	return (
		<>
			<BackgroundGradientAnimation />
			<div className={styles.event_create}>
				<Text
					className={styles.event_create__name}
					size={'s3'}
					color={'primary'}
					weight={'bold'}
				>
					Создание мероприятия
				</Text>
				<Divider style={{ margin: 0 }} />

				<div className={styles.event_create_content}>
					<div className={styles.event_create__item}>
						<Text
							size={'s4'}
							color={'primary'}
						>
							Вид спорта:
						</Text>
						<SportsTypeSelect changeEventField={changeEventField} />
					</div>

					<div className={styles.event_create__item}>
						<Text
							size={'s4'}
							color={'primary'}
						>
							Адрес:
						</Text>
						<AddressInput changeEventField={changeEventField} />
					</div>

					<div className={styles.event_create__item}>
						<Text
							size={'s4'}
							color={'primary'}
						>
							Дата:
						</Text>
						<EventDatePicker changeEventField={changeEventField} />
					</div>

					<div className={styles.event_create__item}>
						<Text
							size={'s4'}
							color={'primary'}
						>
							Время начала и окончания:
						</Text>
						<EventTimePicker changeEventField={changeEventField} />
					</div>

					<div className={styles.event_create__item}>
						<Text
							size={'s4'}
							color={'primary'}
						>
							Цена за участие:
						</Text>
						<PriceInput changeEventField={changeEventField} />
					</div>

					<div className={styles.event_create__item}>
						<Text
							size={'s4'}
							color={'primary'}
						>
							Уровень игры:
						</Text>
						<GameLevelSelect changeEventField={changeEventField} />
					</div>

					<div className={styles.event_create__item}>
						<Text
							className={styles.event_create__capacity}
							size={'s4'}
							color={'primary'}
						>
							Максимальное количество участников:
							<Explanation
								title={
									'Если количество участников не ограничено, то поставьте 0'
								}
							/>
						</Text>
						<CapacityInput changeEventField={changeEventField} />
					</div>

					<div className={styles.event_create__item}>
						<Text
							size={'s4'}
							color={'primary'}
						>
							Описание:
						</Text>
						<DescriptionInput changeEventField={changeEventField} />
					</div>

					<div className={styles.event_create__item}>
						<Text
							size={'s4'}
							color={'primary'}
						>
							Фотографии площадки:
							<Explanation
								title={
									'Первая фотография будет отображаться в качестве основной'
								}
							/>
						</Text>
						<EventUploadImages changeEventField={changeEventField} />
					</div>
				</div>

				<Divider style={{ margin: 0 }} />
				<Button
					type={'primary'}
					onClick={onButtonClick}
				>
					Создать
				</Button>
			</div>
		</>
	);
};

export default EventCreate;

import React, { useState } from 'react';
import { EventInfoModel } from 'types/types/Event/EventInfo.ts';
import styles from './EventEdit.module.scss';
import AddressInput from '../shared/AddressInput/AddressInput.tsx';
import SportsTypeSelect from '../shared/SportTypeSelect/SportTypeSelect.tsx';
import EventDatePicker from '../shared/DatePicker/DatePicker.tsx';
import EventTimePicker from '../shared/TimePicker/TimePicker.tsx';
import PriceInput from '../shared/PriceInput/PriceInput.tsx';
import GameLevelSelect from '../shared/GameLevelSelect/GameLevelSelect.tsx';
import CapacityInput from '../shared/CapacityInput/CapacityInput.tsx';
import EventUploadImages from '../shared/UploadImages/UploadImages.tsx';
import { EventsService } from 'api/EventsService/EventsService.ts';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import Text from 'components/lib/Text/Text.tsx';
import Button from 'components/lib/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'antd';
import Explanation from 'components/lib/Explanation/Explanation.tsx';
import DescriptionInput from '../shared/DescriptionInput/DescriptionInput.tsx';
import { BackgroundGradientAnimation } from 'components/lib/BackgroundAnimation/BackgroundAnimation.tsx';
import useUserInfo from 'hooks/useUserInfo.tsx';
import RequiredField from '../shared/RequiredFiled/RequiredField.tsx';

interface EventEditProps {
	event: EventInfoModel;
}

const EventEdit: React.FC<EventEditProps> = ({ event }) => {
	const { user, isAuthorized } = useUserInfo();

	const navigate = useNavigate();

	if (!isAuthorized || !user?.id) {
		showToast('info', 'Авторизуйтесь, чтобы продолжить');
		navigate('/login');

		return <></>;
	}

	const eventsService = new EventsService();

	const [editedEvent, setEditedEvent] = useState<EventInfoModel>(event);

	const changeEventField = (field: Partial<EventInfoModel>) => {
		setEditedEvent((prev) => ({ ...prev, ...field }));
	};

	const onButtonClick = async () => {
		if (!editedEvent) {
			return;
		}

		try {
			await eventsService.updateEvent(
				{ creatorId: editedEvent.creator.id, ...editedEvent },
				user.id,
			);
			showToast('success', 'Информация о мероприятии обновлена');
			navigate(`/events/${event.id}`);
		} catch (error: any) {
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
			<div className={styles.event_edit_wrapper}>
				<div className={styles.event_edit}>
					<Text
						className={styles.event_edit__name}
						size={'s4'}
						color={'primary'}
						weight={'bold'}
					>
						Редактирование мероприятия
					</Text>
					<Divider style={{ margin: 0 }} />

					<div className={styles.event_edit_content}>
						<div className={styles.event_edit__item}>
							<RequiredField>
								<Text
									size={'s6'}
									color={'primary'}
								>
									Вид спорта:
								</Text>
							</RequiredField>

							<SportsTypeSelect
								value={event.sportType}
								changeEventField={changeEventField}
							/>
						</div>

						<div className={styles.event_edit__item}>
							<RequiredField>
								<Text
									size={'s6'}
									color={'primary'}
								>
									Адрес:
								</Text>
							</RequiredField>

							<AddressInput
								// value={event.address}
								changeEventField={changeEventField}
							/>
						</div>

						<div className={styles.event_edit__item}>
							<RequiredField>
								<Text
									size={'s6'}
									color={'primary'}
								>
									Дата:
								</Text>
							</RequiredField>

							<EventDatePicker
								value={event.date}
								changeEventField={changeEventField}
							/>
						</div>

						<div className={styles.event_edit__item}>
							<RequiredField>
								<Text
									size={'s6'}
									color={'primary'}
								>
									Время начала и окончания:
								</Text>
							</RequiredField>

							<EventTimePicker
								value={
									event.startTime && event.endTime
										? [event.startTime, event.endTime]
										: undefined
								}
								changeEventField={changeEventField}
							/>
						</div>

						<div className={styles.event_edit__item}>
							<RequiredField>
								<Text
									size={'s6'}
									color={'primary'}
								>
									Цена за участие:
								</Text>
							</RequiredField>

							<PriceInput
								value={event.price}
								changeEventField={changeEventField}
							/>
						</div>

						<div className={styles.event_edit__item}>
							<Text
								size={'s6'}
								color={'primary'}
							>
								Уровень игры:
							</Text>
							<GameLevelSelect
								value={event.gameLevel}
								changeEventField={changeEventField}
							/>
						</div>

						<div className={styles.event_edit__item}>
							<Text
								className={styles.event_edit__capacity}
								size={'s6'}
								color={'primary'}
							>
								Максимальное количество участников:
								<Explanation
									title={
										'Если количество участников не ограничено, то поставьте 0'
									}
								/>
							</Text>
							<CapacityInput
								value={event.capacity || undefined}
								changeEventField={changeEventField}
							/>
						</div>

						<div className={styles.event_edit__item}>
							<Text
								size={'s6'}
								color={'primary'}
							>
								Описание:
							</Text>
							<DescriptionInput
								value={event.description || undefined}
								changeEventField={changeEventField}
							/>
						</div>

						<div className={styles.event_edit__item}>
							<Text
								size={'s6'}
								color={'primary'}
							>
								Фотографии площадки:
								<Explanation
									title={
										'Первая фотография будет отображаться в качестве основной'
									}
								/>
							</Text>
							<EventUploadImages
								changeEventField={changeEventField}
								initialFiles={event.photos}
							/>
						</div>
					</div>

					<Divider style={{ margin: 0 }} />
					<Button onClick={onButtonClick}>Сохранить</Button>
				</div>
			</div>
		</>
	);
};

export default EventEdit;

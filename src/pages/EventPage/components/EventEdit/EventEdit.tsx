import React, { useCallback, useEffect, useState } from 'react';
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
import { useUser } from '../../../../contexts/User/userContext.tsx';
import { EventsService } from '../../../../api/EventsService/EventsService.ts';
import { showToast } from '../../../../components/Toast/Toast.tsx';
import Text from '../../../../components/Text/Text.tsx';
import Button from '../../../../components/Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

interface EventEditProps {
	event: EventInfoModel;
}

const EventEdit: React.FC<EventEditProps> = ({ event }) => {
	const { userId } = useUser();

	const navigate = useNavigate();

	const eventsService = new EventsService();

	const [editedEvent, setEditedEvent] = useState<EventInfoModel>(event);

	useEffect(() => {
		console.log(editedEvent);
	}, [setEditedEvent, editedEvent]);

	const changeEventField = useCallback((field: Partial<EventInfoModel>) => {
		setEditedEvent((prev) => ({ ...prev, ...field }));
	}, []);

	const onButtonClick = async () => {
		if (!editedEvent) {
			return;
		}

		try {
			await eventsService.updateEvent(editedEvent, userId);

			showToast('success', 'Информация о событии обновлена');
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

	// надо убрать эти костыли. тут еще с форматом фигня, не считывает +3 мск. надо пофиксить
	const startTime = new Date(event.startTime);
	const startTimeHours = String(startTime.getUTCHours()).padStart(2, '0'); // Преобразуем в строку и добавляем ведущий ноль
	const startTimeMinutes = String(startTime.getUTCMinutes()).padStart(2, '0');
	const formattedStartTime = `${startTimeHours}:${startTimeMinutes}`;

	let formattedEndTime;
	if (event.endTime) {
		const endTime = new Date(event.endTime);
		const endTimeHours = String(endTime.getUTCHours()).padStart(2, '0');
		const EndTimeMinutes = String(endTime.getUTCMinutes()).padStart(2, '0');
		formattedEndTime = `${endTimeHours}:${EndTimeMinutes}`;
	}

	return (
		<div className={styles.event_edit}>
			<Text
				size={'s3'}
				color={'primary'}
				weight={'bold'}
			>
				Редактирование мероприятия
			</Text>
			<Button onClick={onButtonClick}>Сохранить</Button>
			<div className={styles.event_edit__item}>
				<Text
					className={styles.event_edit__item_label}
					size={'s4'}
					color={'primary'}
				>
					Вид спорта:
				</Text>
				<SportsTypeSelect
					value={event.sportType}
					className={styles.event_edit__item_value}
					changeEventField={changeEventField}
				/>
			</div>

			<div className={styles.event_edit__item}>
				<Text
					className={styles.event_edit__item_label}
					size={'s4'}
					color={'primary'}
				>
					Адрес:
				</Text>
				<AddressInput
					value={event.address}
					className={styles.event_edit__item_value}
					changeEventField={changeEventField}
				/>
			</div>

			<div className={styles.event_edit__item}>
				<Text
					className={styles.event_edit__item_label}
					size={'s4'}
					color={'primary'}
				>
					Дата:
				</Text>
				<EventDatePicker
					value={event.date}
					className={styles.event_edit__item_value}
					changeEventField={changeEventField}
				/>
			</div>

			<div className={styles.event_edit__item}>
				<Text
					className={styles.event_edit__item_label}
					size={'s4'}
					color={'primary'}
				>
					Время начала и окончания:
				</Text>
				<EventTimePicker
					value={[formattedStartTime, formattedEndTime || null]}
					className={styles.event_edit__item_value}
					changeEventField={changeEventField}
				/>
			</div>

			<div className={styles.event_edit__item}>
				<Text
					className={styles.event_edit__item_label}
					size={'s4'}
					color={'primary'}
				>
					Цена за участие:
				</Text>
				<PriceInput
					value={event.price}
					className={styles.event_edit__item_value}
					changeEventField={changeEventField}
				/>
			</div>

			<div className={styles.event_edit__item}>
				<Text
					className={styles.event_edit__item_label}
					size={'s4'}
					color={'primary'}
				>
					Уровень игры:
				</Text>
				<GameLevelSelect
					className={styles.event_edit__item_value}
					value={event.gameLevel}
					changeEventField={changeEventField}
				/>
			</div>

			<div className={styles.event_edit__item}>
				<Text
					className={styles.event_edit__item_label}
					size={'s4'}
					color={'primary'}
				>
					Максимальное количество участников:
				</Text>
				<CapacityInput
					className={styles.event_edit__item_value}
					value={event.capacity || undefined}
					changeEventField={changeEventField}
				/>
			</div>

			<div className={styles.event_edit__item}>
				<Text
					className={styles.event_edit__item_label}
					size={'s4'}
					color={'primary'}
				>
					Фотографии площадки:
				</Text>
				<EventUploadImages
					className={styles.event_edit__item_value}
					changeEventField={changeEventField}
					initialFiles={event.photos}
				/>
			</div>
		</div>
	);
};

export default EventEdit;

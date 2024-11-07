import React, { useCallback, useState } from 'react';
import AddressInput from '../shared/AddressInput/AddressInput.tsx';
import SportsTypeSelect from '../shared/SportTypeSelect/SportTypeSelect.tsx';
import EventDatePicker from '../shared/DatePicker/DatePicker.tsx';
import EventTimePicker from '../shared/TimePicker/TimePicker.tsx';
import PriceInput from '../shared/PriceInput/PriceInput.tsx';
import GameLevelSelect from '../shared/GameLevelSelect/GameLevelSelect.tsx';
import CapacityInput from '../shared/CapacityInput/CapacityInput.tsx';
import EventUploadImages from '../shared/UploadImages/UploadImages.tsx';
import { EventCreateModel } from '../../../../types/types/Event/EventCreate.ts';
import Text from 'components/lib/Text/Text.tsx';
import Button from 'components/lib/Button/Button.tsx';
import { EventsService } from 'api/EventsService/EventsService.ts';
import { useUser } from 'contexts/User/userContext.tsx';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { useNavigate } from 'react-router-dom';
import styles from './EventCreate.module.scss';
import { Divider } from 'antd';

const EventCreate: React.FC = () => {
	const { userId } = useUser();

	const navigate = useNavigate();

	const eventsService = new EventsService();

	const [eventToCreate, setEventToCreate] = useState<EventCreateModel | null>(
		null,
	);

	const changeEventField = useCallback((field: Partial<EventCreateModel>) => {
		setEventToCreate((prev) => ({ ...prev, ...field }));
	}, []);

	const onButtonClick = async () => {
		if (!eventToCreate) {
			return;
		}

		try {
			const createdEvent = await eventsService.createEvent(
				eventToCreate,
				userId,
			);
			showToast('success', 'Событие успешно создано');
			navigate(`/events/${createdEvent.id}`);
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
					size={'s4'}
					color={'primary'}
				>
					Максимальное количество участников:
				</Text>
				<CapacityInput changeEventField={changeEventField} />
			</div>

			<div className={styles.event_create__item}>
				<Text
					size={'s4'}
					color={'primary'}
				>
					Фотографии площадки:
				</Text>
				<EventUploadImages changeEventField={changeEventField} />
			</div>

			<Divider style={{ margin: 0 }} />

			<Button
				type={'primary'}
				onClick={onButtonClick}
			>
				Создать
			</Button>
		</div>
	);
};

export default EventCreate;

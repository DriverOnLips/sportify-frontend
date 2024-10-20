import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventsService } from '../../api/EventsService/EventsService.ts';
import { Loader } from 'components/Loader/Loader.tsx';
import { showToast } from '../../components/Toast/Toast.tsx';

import { EventInfoModel } from '../../types/types/Event/EventInfo.ts';
import EventInfo from './components/EventInfo/EventInfo.tsx';
import YandexMap from './components/YandexMap/YandexMap.tsx';
import styles from './EventPage.module.scss';
import useEditMode from '../../hooks/usePageMode.ts';
import EventEdit from './components/EventEdit/EventEdit.tsx';

const EventPage: React.FC = () => {
	const { id } = useParams();
	const [event, setEvent] = useState<EventInfoModel | null>(null);
	const idEditMode = useEditMode();

	const eventsService = new EventsService();

	const getEvents = async (id: string) => {
		try {
			const evt = await eventsService.getEventInfo(id);
			setEvent(evt);
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

	useEffect(() => {
		if (!id) {
			return;
		}

		getEvents(id);
	}, [id]);

	return (
		<div className={styles.event_page}>
			{event ? (
				<>
					<>
						{!idEditMode ? (
							<>
								<div className={styles.event_page__info}>
									<EventInfo event={event} />
								</div>

								<div className={styles.event_page__map}>
									<YandexMap address={event.address} />
								</div>
							</>
						) : (
							<EventEdit event={event} />
						)}
					</>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default EventPage;

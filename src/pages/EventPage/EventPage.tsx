import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventsService } from '../../api/EventsService/EventsService.ts';
import { Loader } from 'components/lib/Loader/Loader.tsx';
import { showToast } from 'components/lib/Toast/Toast.tsx';
import { EventInfoModel } from '../../types/types/Event/EventInfo.ts';
import EventInfo from './components/EventInfo/EventInfo.tsx';
import YandexMap from './components/EventPageYandexMap/EventPageYandexMap.tsx';
import styles from './EventPage.module.scss';
import useQueryParams from '../../hooks/useQueryParams.ts';
import EventEdit from './components/EventEdit/EventEdit.tsx';
import { useScreenMode } from '../../hooks/useScreenMode.ts';
import { Divider, Radio } from 'antd';

const EventPage: React.FC = () => {
	const screenWidth = useScreenMode();
	const isWide = screenWidth > 650;

	const { id } = useParams();

	const { edit } = useQueryParams();

	const eventsService = new EventsService();

	const [event, setEvent] = useState<EventInfoModel | null>(null);
	const [selectedTransport, setSelectedTransport] = useState<
		'auto' | 'masstransit' | 'pedestrian'
	>('auto');

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

	const handleTransportChange = (e: any) => {
		setSelectedTransport(e.target.value);
	};

	return (
		<div className={styles.event_page}>
			{event ? (
				<>
					{edit !== 'true' ? (
						<>
							<div className={styles.event_page__info}>
								<EventInfo event={event} />
							</div>

							{!isWide && <Divider />}

							<div className={styles.event_page__map}>
								<YandexMap
									address={event.address}
									transport={selectedTransport}
								/>

								<div className={styles.event_page__transport}>
									<Radio.Group
										value={selectedTransport}
										onChange={handleTransportChange}
									>
										<Radio value='pedestrian'>Пешком</Radio>
										<Radio value='auto'>Автомобиль</Radio>
										<Radio value='masstransit'>Общественный транспорт</Radio>
									</Radio.Group>
								</div>
							</div>
						</>
					) : (
						<EventEdit event={event} />
					)}
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default EventPage;

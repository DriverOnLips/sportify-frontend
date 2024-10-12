import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  createEventTypeModel,
  EventTypeModel,
} from '../../types/types/EventType.ts';
import { EventsService } from '../../api/EventsService/EventsService.ts';
import { Loader } from '../../components/Loader/Loader.tsx';
import React from 'react';
import { toast } from 'sonner';
import EventInfo from './components/EventInfo.tsx';
import YandexMap from './components/YandexMap.tsx';
import styles from './EventPage.module.scss';

const EventPage: React.FC = () => {
  const { id } = useParams();
  if (!id) return <React.Fragment />;

  const [event, setEvent] = useState<EventTypeModel | null>(null);

  const eventsService = new EventsService();

  const getEvents = async () => {
    try {
      const e = await eventsService.getEventInfo(id);
      setEvent(createEventTypeModel(e));
    } catch (e) {
      toast.message(`Ошибка при получении данных: ${(e as Error).message}`, {
        className: 'error',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

	return (
		<div className={styles.eventPage}>
			<div className={styles.eventContainer}>
				{event ? <EventInfo event={event} /> : <Loader />}
			</div>
		</div>
	);

};

export default EventPage;
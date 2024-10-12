import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventTypeModel } from '../../types/types/EventType.ts';

const EventPage: React.FC = () => {
	const { id } = useParams();
	const [event, setEvent] = useState<EventTypeModel | null>(null);

	const events: EventTypeModel[] = useMemo(
		() => [
			{
				id: '1',
				name: 'Футбольчик',
				location: 'Бауманская',
			},
			{
				id: '2',
				name: 'Баскетбол',
				location: 'Электро',
			},
		],
		[],
	);

	useEffect(() => setEvent(events.filter((event) => event.id === id)[0]), [id]);

	return (
		<>
			{event ? (
				<div className={'event_page'}>
					<span>{event.id}</span>
					<span>{event.name}</span>
					<span>{event.location}</span>
				</div>
			) : (
				<span>Loading...</span>
			)}
		</>
	);
};

export default EventPage;

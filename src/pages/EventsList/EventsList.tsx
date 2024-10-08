import ListItem from './components/ListItem/ListItem';
import { EventFromListModel } from 'types/EventFromList/EventFromList';

const EventsList: React.FC = () => {
	const events: EventFromListModel[] = [
		{
			id: '1',
			name: 'Футбольчик',
		},
		{
			id: '2',
			name: 'Баскетбол',
		},
	];

	return (
		<div className={'events_list'}>
			{events.map((event) => (
				<ListItem
					key={event.id}
					event={event}
				/>
			))}
		</div>
	);
};

export default EventsList;

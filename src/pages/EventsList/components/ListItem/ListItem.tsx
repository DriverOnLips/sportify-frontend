import { EventFromListModel } from '../../../../types/types/EventFromList.ts';
import styles from './ListItem.module.scss';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const ListItem: React.FC<{ event: EventFromListModel }> = ({ event }) => {
	const navigate = useNavigate();

	const onItemClick = useCallback(() => {
		navigate(`/event/${event.id}`);
	}, []);

	return (
		<div
			className={styles.list_item_page}
			onClick={onItemClick}
		>
			<span>{event.id}</span>
			<span>{event.name}</span>
		</div>
	);
};

export default ListItem;

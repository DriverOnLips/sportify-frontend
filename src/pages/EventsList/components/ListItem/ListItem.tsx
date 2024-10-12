import { EventFromListModel } from '../../../../types/types/EventFromList.ts';
import styles from './ListItem.module.scss';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from 'antd';
import Text from '../../../../components/Text/Text.tsx';

const ListItem: React.FC<{ event: EventFromListModel }> = ({ event }) => {
	const navigate = useNavigate();

	const onItemClick = useCallback(() => {
		navigate(`/event/${event.id}`);
	}, []);

	return (
		<Card
			className={styles.list_item}
			hoverable
			cover={
				<img
					alt='example'
					src={event.preview}
				/>
			}
			onClick={onItemClick}
		>
			<div className={styles.list_item__content}>
				<Text>Card content</Text>
				<Text>Card content</Text>
				<Text>Card content</Text>
				<Text>Card content</Text>
				<Text>Card content</Text>
				<Text>Card content</Text>
			</div>
			{/*<Meta*/}
			{/*	title='Europe Street beat'*/}
			{/*	description='www.instagram.com'*/}
			{/*/>*/}
		</Card>
	);
};

export default ListItem;

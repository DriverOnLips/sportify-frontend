import Button from 'components/Button/Button.tsx';
import Text from 'components/Text/Text.tsx';
import React, { useCallback, useEffect, useState } from 'react';
import { EventInfoModel } from '../../../../types/types/Event/EventInfo.ts';
import { convertSportTypeToDisplayValue } from '../../../../utils/converSportTypes.ts';
import styles from './EventEdit.module.scss';
import Image from '../../../../components/Image/Image.tsx';

interface EventEditProps {
	event: EventInfoModel;
}

const EventEdit: React.FC<EventEditProps> = ({ event }) => {
	const [editedEvent, setEditedEvent] = useState<EventInfoModel>(event);

	const handleChange = useCallback(
		(changes: Partial<EventInfoModel>) => () => {
			setEditedEvent((prev) => ({ ...prev, ...changes }));
		},
		[],
	);

	return (
		<div className={styles.event_edit}>
			<div className={styles.eventType}>
				<div className={styles.eventDetails}>
					<Text
						size={'s4'}
						color={'primary'}
					>
						{convertSportTypeToDisplayValue(event.sportType)}
					</Text>
				</div>
			</div>
			<Image
				src={event.preview}
				className={styles.eventImage}
			/>
			<div className={styles.eventDetails}>
				<div className={styles.eventPriceContainer}>
					<input
						type='text'
						value={
							editedEvent.isFree ? 'Бесплатно' : `${editedEvent.price ?? 0}`
						}
						onChange={(e) => {
							const isFree =
								e.target.value.trim().toLowerCase() === 'бесплатно';
							const price = isFree ? 0 : parseFloat(e.target.value) || 0;
							handleChange({ isFree, price });
						}}
					/>
					<div className={styles.buttonsContainer}></div>
				</div>
				<Text
					size={'s6'}
					color={'secondary'}
				>
					<Text
						size={'s6'}
						weight={'bold'}
						color={'primary'}
					>
						Описание
					</Text>
					<br />
					<textarea
						value={editedEvent.description ?? ''}
						onChange={(e) => handleChange({ description: e.target.value })}
					/>
				</Text>
				<Text
					size={'s6'}
					weight={'bold'}
					color={'primary'}
				>
					Адрес
					<br />
					<input
						type='text'
						value={editedEvent.address ?? ''}
						onChange={(e) => handleChange({ address: e.target.value })}
					/>
				</Text>
				<Text
					size={'s6'}
					weight={'bold'}
					color={'primary'}
				>
					{'Дата: '}
					<br />
					<input
						type='date'
						value={
							editedEvent.date
								? new Date(editedEvent.date).toISOString().split('T')[0]
								: ''
						}
						onChange={(e) => handleChange({ date: e.target.value })}
					/>
				</Text>
				<Text
					size={'s6'}
					weight={'bold'}
					color={'primary'}
				>
					{'Время проведения: '}
					<br />
					<div>
						<input
							type='time'
							value={editedEvent.startTime ?? ''}
							onChange={(e) => handleChange({ startTime: e.target.value })}
						/>
						—
						<input
							type='time'
							value={editedEvent.endTime ?? ''}
							onChange={(e) => handleChange({ endTime: e.target.value })}
						/>
					</div>
				</Text>
				{/*{mode === 'create' && (*/}
				{/*	<>*/}
				{/*		<div className={styles.eventPriceContainer}>*/}
				{/*			<input*/}
				{/*				type='text'*/}
				{/*				placeholder='Введите цену'*/}
				{/*				onChange={(e) => {*/}
				{/*					const isFree =*/}
				{/*						e.target.value.trim().toLowerCase() === 'бесплатно';*/}
				{/*					const price = isFree ? 0 : parseFloat(e.target.value) || 0;*/}
				{/*					handleChange({ isFree, price });*/}
				{/*				}}*/}
				{/*			/>*/}
				{/*			<div className={styles.buttonsContainer}>*/}
				{/*				<Button onClick={handleSave}>Сохранить</Button>*/}
				{/*				<Button onClick={handleDelete}>*/}
				{/*					<DeleteOutlined />*/}
				{/*				</Button>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*		<Text*/}
				{/*			size={'s6'}*/}
				{/*			color={'secondary'}*/}
				{/*		>*/}
				{/*			<Text*/}
				{/*				size={'s6'}*/}
				{/*				weight={'bold'}*/}
				{/*				color={'primary'}*/}
				{/*			>*/}
				{/*				Описание*/}
				{/*			</Text>*/}
				{/*			<br />*/}
				{/*			<textarea*/}
				{/*				placeholder='Введите описание'*/}
				{/*				onChange={(e) => handleChange({ description: e.target.value })}*/}
				{/*			/>*/}
				{/*		</Text>*/}
				{/*		<Text*/}
				{/*			size={'s6'}*/}
				{/*			weight={'bold'}*/}
				{/*			color={'primary'}*/}
				{/*		>*/}
				{/*			Адрес*/}
				{/*			<br />*/}
				{/*			<input*/}
				{/*				type='text'*/}
				{/*				placeholder='Введите адрес'*/}
				{/*				onChange={(e) => handleChange({ address: e.target.value })}*/}
				{/*			/>*/}
				{/*		</Text>*/}
				{/*		<Text*/}
				{/*			size={'s6'}*/}
				{/*			weight={'bold'}*/}
				{/*			color={'primary'}*/}
				{/*		>*/}
				{/*			{'Дата: '}*/}
				{/*			<br />*/}
				{/*			<input*/}
				{/*				type='date'*/}
				{/*				onChange={(e) => handleChange({ date: e.target.value })}*/}
				{/*			/>*/}
				{/*		</Text>*/}
				{/*		<Text*/}
				{/*			size={'s6'}*/}
				{/*			weight={'bold'}*/}
				{/*			color={'primary'}*/}
				{/*		>*/}
				{/*			{'Время проведения: '}*/}
				{/*			<br />*/}
				{/*			<div>*/}
				{/*				<input*/}
				{/*					type='time'*/}
				{/*					placeholder='Начало'*/}
				{/*					onChange={(e) => handleChange({ startTime: e.target.value })}*/}
				{/*				/>*/}
				{/*				—*/}
				{/*				<input*/}
				{/*					type='time'*/}
				{/*					placeholder='Конец'*/}
				{/*					onChange={(e) => handleChange({ endTime: e.target.value })}*/}
				{/*				/>*/}
				{/*			</div>*/}
				{/*		</Text>*/}
				{/*	</>*/}
				{/*)}*/}
			</div>
		</div>
	);
};

export default EventEdit;

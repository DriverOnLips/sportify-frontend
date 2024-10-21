import React, { useCallback, useEffect, useState } from 'react';
import { EventInfoModel } from 'types/types/Event/EventInfo.ts';
import styles from './EventEdit.module.scss';
import AddressInput from './components/AddressInput/AddressInput.tsx';
import SportsTypeSelect from './components/SportTypeSelect/SportTypeSelect.tsx';
import EventDatePicker from './components/DatePicker/DatePicker.tsx';
import EventTimePicker from './components/TimePicker/TimePicker.tsx';
import PriceInput from './components/PriceInput/PriceInput.tsx';
import GameLevelSelect from './components/GameLevelSelect/GameLevelSelect.tsx';
import CapacityInput from './components/CapacityInput/CapacityInput.tsx';
import EventUploadImages from './components/UploadImages/UploadImages.tsx';

interface EventEditProps {
	event: EventInfoModel;
}

const EventEdit: React.FC<EventEditProps> = ({ event }) => {
	const [editedEvent, setEditedEvent] = useState<EventInfoModel>(event);

	useEffect(() => {
		console.log(editedEvent);
	}, [setEditedEvent, editedEvent]);

	const changeEventField = useCallback((field: Partial<EventInfoModel>) => {
		setEditedEvent((prev) => ({ ...prev, ...field }));
	}, []);

	return (
		<div className={styles.event_edit}>
			<AddressInput changeEventField={changeEventField} />
			<SportsTypeSelect changeEventField={changeEventField} />
			<EventDatePicker changeEventField={changeEventField} />
			<EventTimePicker changeEventField={changeEventField} />
			<PriceInput changeEventField={changeEventField} />
			<GameLevelSelect changeEventField={changeEventField} />
			<CapacityInput changeEventField={changeEventField} />
			<EventUploadImages changeEventField={changeEventField} />
		</div>
	);
};

export default EventEdit;

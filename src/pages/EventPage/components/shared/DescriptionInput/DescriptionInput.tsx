import React, { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { EventCreateModel } from 'types/types/Event/EventCreate.ts';
import Textarea from 'components/lib/Textarea/Textarea.tsx';

type Props = {
	className?: string;
	value?: string;
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const DescriptionInput: React.FC<Props> = ({
	className,
	value,
	changeEventField,
}) => {
	const [description, setDescription] = useState<string>(value || '');

	const updateDescription = useMemo(
		() =>
			debounce(
				(value: string) => changeEventField({ description: value }),
				500,
			),
		[],
	);

	const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const val = e.target.value;
		setDescription(val);
		updateDescription(val);
	};

	return (
		<Textarea
			placeholder='Введите описание'
			className={className}
			value={description}
			onChange={changeDescription}
		/>
	);
};

export default DescriptionInput;

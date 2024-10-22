import React, { useCallback, useEffect, useState } from 'react';
import { EventCreateModel } from '../../../../../types/types/Event/EventCreate.ts';
import UploadImages from '../../../../../components/UploadImages/UploadImages.tsx';

type Props = {
	className?: string;
	changeEventField: (field: Partial<EventCreateModel>) => void;
};

const EventUploadImages: React.FC<Props> = ({
	className,
	changeEventField,
}) => {
	const [imgsUrls, setImgsUrls] = useState<string[]>([]);

	const updatePhotos = (photos: string[]) =>
		changeEventField({ photos, preview: photos[0] });

	useEffect(() => {
		updatePhotos(imgsUrls);
	}, [imgsUrls]);

	const setLink = useCallback((value: string) => {
		setImgsUrls((prev) => [...prev, value]);
	}, []);

	const removeLink = useCallback((value: string) => {
		setImgsUrls((prev) => prev.filter((url) => url !== value));
	}, []);

	return (
		<UploadImages
			className={className}
			setLink={setLink}
			removeLink={removeLink}
		/>
	);
};

export default EventUploadImages;

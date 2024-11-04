import { useState, useEffect } from 'react';

export const useScreenMode = () => {
	const [size, setSize] = useState<number>(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth;
			setSize(screenWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return size;
};

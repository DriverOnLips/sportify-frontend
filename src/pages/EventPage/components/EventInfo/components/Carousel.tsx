import React from 'react';
import { Carousel as AntdCarousel } from 'antd';
import Image from 'components/lib/Image/Image.tsx';
import { useScreenMode } from 'hooks/useScreenMode.ts';

type Props = {
	photos: string[];
	style?: React.CSSProperties;
};

const Carousel: React.FC<Props> = ({ photos, style }) => {
	const screenWidth = useScreenMode();
	const isWide = screenWidth > 650;

	return (
		<div style={style}>
			<AntdCarousel
				arrows
				autoplay
				style={{
					width: isWide
						? 'calc((100vw - 300px) / 2)'
						: 'calc(100vw - 80px - 2rem)',
				}}
			>
				{photos.map((photo, index) => (
					<Image
						key={index}
						src={photo}
						style={{ overflow: 'hidden' }}
					/>
				))}
			</AntdCarousel>
		</div>
	);
};

export default Carousel;

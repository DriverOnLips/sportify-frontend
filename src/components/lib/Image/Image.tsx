import React from 'react';
import { Image as AntdImage } from 'antd';

type Props = {
	src?: string;
	style?: React.CSSProperties;
	width?: string;
	height?: string;
	className?: string;
};

const Image: React.FC<Props> = ({ src, style, width, height, className }) => (
	<AntdImage
		className={className}
		width={width}
		height={height}
		style={{ ...style, objectFit: 'cover' }}
		src={src || 'http://127.0.0.1:8080/api/v1/img/default_football.jpeg'}
	/>
);

export default Image;

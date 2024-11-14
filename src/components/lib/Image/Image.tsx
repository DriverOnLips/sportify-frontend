import React from 'react';
import { Image as AntdImage } from 'antd';

type Props = {
	src?: string;
	style?: React.CSSProperties;
	className?: string;
};

const Image: React.FC<Props> = ({ src, style, className }) => (
	<AntdImage
		className={className}
		style={style}
		src={src || 'http://127.0.0.1:8080/api/v1/img/default_football.jpeg'}
	/>
);

export default Image;

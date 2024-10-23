import React from 'react';
import { Image as AntdImage } from 'antd';

type Props = {
	width?: number;
	src?: string;
	className?: string;
};

const Image: React.FC<Props> = ({ width, src, className }) => (
	<AntdImage
		className={className}
		width={width || 200}
		src={src || 'http://127.0.0.1:8080/api/v1/img/default_football.jpeg'}
	/>
);

export default Image;

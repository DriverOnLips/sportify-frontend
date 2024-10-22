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
		src={
			src ||
			'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
		}
	/>
);

export default Image;

import { Descriptions } from 'antd';
import React from 'react';
import Text from '../Text/Text.tsx';

type Items = {
	label?: React.ReactNode;
	value: React.ReactNode;
	itemMaxLines?: number;
};

type Props = {
	title?: string;
	items?: Items[];
	style?: React.CSSProperties;
	itemStyle?: React.CSSProperties;
};

const LabelValue: React.FC<Props> = ({ title, items, style, itemStyle }) => {
	return (
		<Descriptions
			title={title}
			column={1}
			style={style}
		>
			{items?.map((item, index) => (
				<Descriptions.Item
					key={index}
					style={itemStyle}
					label={
						item.label && (
							<Text
								size={'s6'}
								color={'primary'}
								weight={'bold'}
							>
								{item.label}
							</Text>
						)
					}
				>
					<Text
						size={'s6'}
						maxLines={item.itemMaxLines}
					>
						{item.value}
					</Text>
				</Descriptions.Item>
			))}
		</Descriptions>
	);
};

export default LabelValue;

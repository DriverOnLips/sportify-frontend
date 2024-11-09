import { Descriptions } from 'antd';
import React from 'react';
import Text from '../Text/Text.tsx';

type Items = {
	label?: React.ReactNode;
	value: React.ReactNode;
};

type Props = {
	title?: string;
	items?: Items[];
};

const LabelValue: React.FC<Props> = ({ title, items }) => {
	return (
		<Descriptions
			title={title}
			column={1}
		>
			{items?.map((item, index) => (
				<Descriptions.Item
					key={index}
					label={
						item.label && (
							<Text
								color={'primary'}
								weight={'bold'}
							>
								{item.label}
							</Text>
						)
					}
				>
					<Text maxLines={3}>{item.value}</Text>
				</Descriptions.Item>
			))}
		</Descriptions>
	);
};

export default LabelValue;

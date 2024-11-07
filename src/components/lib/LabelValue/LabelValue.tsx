import { Descriptions } from 'antd';
import React, { useEffect } from 'react';
import Text from '../Text/Text.tsx';

type Items = {
	label: string;
	value: React.ReactNode;
};

type Props = {
	title?: string;
	items?: Items[];
};

const LabelValue: React.FC<Props> = ({ title, items }) => {
	const updateFlexDirection = () => {
		const containers = document.querySelectorAll(
			'.ant-descriptions-item-container',
		) as NodeListOf<HTMLElement>;

		containers.forEach((container) => {
			if (container.offsetWidth < 250) {
				container.style.flexDirection = 'column';
			} else {
				container.style.flexDirection = 'row';
			}
		});
	};

	useEffect(() => {
		window.addEventListener('resize', updateFlexDirection);

		return () => window.removeEventListener('resize', updateFlexDirection);
	}, []);

	return (
		<Descriptions
			title={title}
			column={1}
		>
			{items?.map((item, index) => (
				<Descriptions.Item
					key={index}
					style={{
						paddingBottom: 10,
						flexDirection: 'column',
					}}
					label={
						<Text
							color={'primary'}
							weight={'bold'}
						>
							{item.label}:
						</Text>
					}
				>
					<Text maxLines={3}>{item.value}</Text>
				</Descriptions.Item>
			))}
		</Descriptions>
	);
};

export default LabelValue;

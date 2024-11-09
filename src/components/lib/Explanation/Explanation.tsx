import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

type Props = {
	title?: string;
	placement?: TooltipPlacement;
};

const Explanation: React.FC<Props> = ({ title, placement = 'top' }) => {
	return (
		<Tooltip
			title={title}
			placement={placement}
		>
			<QuestionCircleOutlined style={{ width: 20, marginLeft: 8 }} />
		</Tooltip>
	);
};

export default Explanation;

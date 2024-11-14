import React from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';

type Props = {
	title?: string;
	placement?: TooltipPlacement;
	children?: React.ReactNode;
};

const Tooltip: React.FC<Props> = ({ title, placement, children = 'top' }) => {
	return (
		<AntdTooltip
			title={title}
			placement={placement}
		>
			{children}
		</AntdTooltip>
	);
};

export default Tooltip;

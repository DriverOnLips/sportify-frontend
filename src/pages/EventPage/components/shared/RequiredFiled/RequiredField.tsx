import React from 'react';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import Text from 'components/lib/Text/Text.tsx';
import styles from './RequiredField.module.scss';

type Props = {
	placement?: TooltipPlacement;
	children: React.ReactNode;
};

const TITLE = 'Это поле обязательно для заполнения';

const RequiredField: React.FC<Props> = ({
	placement = 'topLeft',
	children,
}) => {
	return (
		<Tooltip
			title={TITLE}
			placement={placement}
			className={styles.required_field}
		>
			<Text style={{ color: 'red' }}>*</Text> {children}
		</Tooltip>
	);
};

export default RequiredField;

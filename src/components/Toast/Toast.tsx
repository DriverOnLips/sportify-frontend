import {CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined,} from '@ant-design/icons';
import {notification} from 'antd';

type NotificationType = 'success' | 'info' | 'error';
type Placement =
	| 'top'
	| 'topLeft'
	| 'topRight'
	| 'bottom'
	| 'bottomLeft'




  
	| 'bottomRight';

const getIconByType = (type: NotificationType) => {
	switch (type) {
		case 'success':
			return <CheckCircleOutlined style={{ color: 'green' }} />;
		case 'info':
			return <InfoCircleOutlined style={{ color: 'blue' }} />;
		case 'error':
			return <CloseCircleOutlined style={{ color: 'red' }} />;
		default:
			return <InfoCircleOutlined style={{ color: 'blue' }} />;
	}
};

export const showToast = (
	type: NotificationType,
	message: string,
	description: string,
	placement?: Placement,
	duration?: number
): void => {
	notification.open({
		icon: getIconByType(type),



		
		placement: placement || 'topRight',
		message,
		description,
		duration: duration !== undefined ? duration : 3,
		showProgress: true,
	});
};

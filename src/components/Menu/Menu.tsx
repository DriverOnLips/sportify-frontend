import {
	CarryOutOutlined,
	HeatMapOutlined,
	OrderedListOutlined,
	PlusCircleOutlined,
	TeamOutlined,
	UnorderedListOutlined,
	UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';
import React from 'react';
import { useScreenMode } from 'hooks/useScreenMode.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import './Menu.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
	{
		key: '1',
		label: 'Список мероприятий',
		icon: <CarryOutOutlined />,
		children: [
			{
				key: '2',
				label: 'Список',
				icon: <OrderedListOutlined />,
			},
			{
				key: '3',
				label: 'Карта',
				icon: <HeatMapOutlined />,
			},
		],
	},
	{
		key: '4',
		label: 'Мероприятия',
		icon: <CarryOutOutlined />,
		children: [
			{
				key: '5',
				label: 'Мои мероприятия',
				icon: <UnorderedListOutlined />,
			},
			{
				key: '6',
				label: 'Создать мероприятие',
				icon: <PlusCircleOutlined />,
			},
		],
	},
	{ key: '7', icon: <TeamOutlined />, label: 'Клубы' },
	{ key: '8', icon: <UserOutlined />, label: 'Профиль' },
];

const Menu: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const screenWidth = useScreenMode();

	const isWide = screenWidth > 650;

	const getActiveKey = () => {
		switch (location.pathname) {
			case '/':
				return ['2'];
			case '/map':
				return ['3'];
			case '/events':
				return ['5'];
			case '/create-event':
				return ['6'];
			case '/clubs':
				return ['7'];
			case '/profile':
				return ['8'];
			default:
				return ['2'];
		}
	};

	const handleClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case '2':
				navigate('/');
				break;
			case '3':
				navigate('/map');
				break;
			case '5':
				navigate('/events');
				break;
			case '6':
				navigate('/create-event');
				break;
			case '7':
				navigate('/clubs');
				break;
			case '8':
				navigate('/profile');
				break;
			default:
				break;
		}
	};

	return (
		<div id='menu'>
			<AntdMenu
				selectedKeys={getActiveKey()}
				defaultOpenKeys={['1']}
				mode={'inline'}
				theme='light'
				inlineCollapsed={!isWide}
				items={items}
				onClick={handleClick}
			/>
		</div>
	);
};

export default Menu;

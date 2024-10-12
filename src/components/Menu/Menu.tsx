import React from 'react';
import {
	TeamOutlined,
	PlusCircleOutlined,
	CarryOutOutlined,
	UnorderedListOutlined,
	OrderedListOutlined,
	HeatMapOutlined,
	UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';
import { useScreenMode } from '../../hooks/useScreenMode.ts';
import './Menu.scss';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

// Функция для динамического создания меню в зависимости от ширины экрана
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
	const screenWidth = useScreenMode();
	const isWide = screenWidth > 650;

	const navigate = useNavigate();

	const handleClick: MenuProps['onClick'] = (e) => {
		switch (e.key) {
			case '2':
				navigate('/');
				break;
			default:
				break;
		}
	};

	return (
		<div id='menu'>
			<AntdMenu
				defaultSelectedKeys={['2']}
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

import {
	CarryOutOutlined,
	GlobalOutlined,
	AppstoreOutlined,
	PlusCircleOutlined,
	UnorderedListOutlined,
	UserOutlined,
	ClockCircleOutlined,
	OrderedListOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';
import React, { useCallback } from 'react';
import { useScreenMode } from 'hooks/useScreenMode.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Menu.module.scss';
import Text from '../lib/Text/Text.tsx';
import useEventsList from '../../hooks/useEventsList.tsx';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
	{
		key: '1',
		label: 'Список мероприятий',
		icon: <CarryOutOutlined />,
		children: [
			{
				key: '2',
				label: 'Лента',
				icon: <AppstoreOutlined />,
			},
			{
				key: '3',
				label: 'Карта',
				icon: <GlobalOutlined />,
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
				label: 'Создать',
				icon: <PlusCircleOutlined />,
			},
			{
				key: '6',
				label: 'Мои',
				icon: <UnorderedListOutlined />,
				disabled: true,
			},
			{
				key: '7',
				label: 'Предстоящие',
				icon: <OrderedListOutlined />,
				disabled: true,
			},
			{
				key: '8',
				label: 'Прошедшие',
				icon: <ClockCircleOutlined />,
				disabled: true,
			},
		],
	},
	{ key: '9', icon: <UserOutlined />, label: 'Профиль', disabled: true },
];

const Menu: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 850;

	const { getEvents } = useEventsList();

	const handleLogoClick = useCallback(() => {
		navigate('/events');

		getEvents();
	}, []);

	const getActiveKey = () => {
		switch (location.pathname) {
			case '/events':
				return ['2'];
			case '/map':
				return ['3'];
			case '/events-my':
				return ['5'];
			case '/events-create':
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
				navigate('/events');
				break;
			case '3':
				navigate('/map');
				break;
			case '5':
				navigate('/events-my');
				break;
			case '6':
				navigate('/events-create');
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
		<div className={styles.menu}>
			<div className={styles.menu__logo}>
				<Text
					weight={'bold'}
					size={'s3'}
					className={styles.menu__logo_span}
					onClick={handleLogoClick}
				>
					{isWide ? 'Sportify' : 'S'}
				</Text>
			</div>

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

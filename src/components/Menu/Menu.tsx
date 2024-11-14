import {
	CarryOutOutlined,
	GlobalOutlined,
	AppstoreOutlined,
	PlusCircleOutlined,
	UnorderedListOutlined,
	UserOutlined,
	ClockCircleOutlined,
	OrderedListOutlined,
	LoginOutlined,
	LogoutOutlined,
	SmileOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';
import React from 'react';
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
	{
		key: '9',
		label: 'Аккаунт',
		icon: <SmileOutlined />,
		children: [
			{
				key: '10',
				label: 'Профиль',
				icon: <UserOutlined />,
				disabled: true,
			},
			{
				key: '11',
				label: 'Войти',
				icon: <LoginOutlined />,
			},
			{
				key: '12',
				label: 'Выйти',
				icon: <LogoutOutlined />,
				disabled: true,
			},
		],
	},
];

const Menu: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 850;

	const { getAllEvents } = useEventsList();

	const handleLogoClick = () => {
		if (location.pathname === '/events') {
			window.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		navigate('/events');
		getAllEvents();
	};

	const getActiveKey = () => {
		switch (location.pathname) {
			case '/events':
				return ['2'];
			case '/map':
				return ['3'];
			case '/events-create':
				return ['5'];
			case '/events-my':
				return ['6'];
			case '/clubs':
				return ['7'];
			case '/profile':
				return ['8'];
			case '/login':
				return ['11'];
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
				navigate('/events-create');
				break;
			case '6':
				navigate('/events-my');
				break;
			case '7':
				navigate('/clubs');
				break;
			case '8':
				navigate('/profile');
				break;
			case '11':
				navigate('/login');
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
				defaultOpenKeys={isWide ? ['1'] : []}
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

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
	PlayCircleOutlined,
} from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import type { MenuProps } from 'antd';
import { Menu as AntdMenu } from 'antd';
import React from 'react';
import { useScreenMode } from 'hooks/useScreenMode.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Menu.module.scss';
import useUserInfo from 'hooks/useUserInfo.tsx';
import { useSelector } from 'react-redux';
import { selectIsSidebarOpen } from '../../states/AppState/AppState.tsx';

type MenuItem = Required<MenuProps>['items'][number];

const Menu: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const { isAuthorized, user } = useUserInfo();

	const isSidebarOpen = useSelector(selectIsSidebarOpen);

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 850;

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
			icon: <PlayCircleOutlined />,
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
				},
				{
					key: '8',
					label: 'Прошедшие',
					icon: <ClockCircleOutlined />,
				},
			],
		},
		{
			key: '9',
			label: 'Аккаунт',
			icon: <SmileOutlined />,
			children: [
				isAuthorized
					? {
							key: '10',
							label: 'Профиль',
							icon: <UserOutlined />,
						}
					: null,
				!isAuthorized
					? {
							key: '11',
							label: 'Войти',
							icon: <LoginOutlined />,
						}
					: {
							key: '12',
							label: 'Выйти',
							icon: <LogoutOutlined />,
						},
			],
		},
	];

	const getActiveKey = () => {
		const path = location.pathname.split('/').slice(0, 2).join('/');
		switch (path) {
			case '/events':
				return ['2'];
			case '/map':
				return ['3'];
			case '/events-create':
				return ['5'];
			case '/events-my':
				return ['6'];
			case '/events-upcoming':
				return ['7'];
			case '/events-past':
				return ['8'];
			case '/profile':
				return ['10'];
			case '/login':
				return ['11'];
			case '/logout':
				return ['12'];
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
				navigate('/events-upcoming');
				break;
			case '8':
				navigate('/events-past');
				break;
			case '10':
				navigate(`/profile/${user!.id}`);
				break;
			case '11':
				navigate('/login');
				break;
			case '12':
				navigate('/logout');
				break;
			default:
				break;
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ width: isWide ? '300px' : 0 }}
				animate={{ width: isWide ? '300px' : isSidebarOpen ? '80px' : 0 }}
				exit={{ width: isWide ? '300px' : 0 }}
				layout
				className={styles.menu}
			>
				<AntdMenu
					selectedKeys={getActiveKey()}
					defaultOpenKeys={isWide ? ['1'] : []}
					mode={'inline'}
					theme='light'
					inlineCollapsed={!isWide}
					items={items}
					onClick={handleClick}
				/>
			</motion.div>
		</AnimatePresence>
	);
};

export default Menu;

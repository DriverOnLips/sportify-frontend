import React, { useState } from 'react';
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	PlusCircleOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	CarryOutOutlined,
	UnorderedListOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
	{ key: '1', icon: <UnorderedListOutlined />, label: 'Список мероприятий' },
	{
		key: 'sub1',
		label: 'Мероприятия',
		icon: <CarryOutOutlined />,
		children: [
			{ key: '5', label: 'Мои мероприятия', icon: <UnorderedListOutlined /> },
			{ key: '6', label: 'Создать мероприятие', icon: <PlusCircleOutlined /> },
		],
	},
	{ key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
	{ key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
	{
		key: 'sub2',
		label: 'Navigation Two',
		icon: <AppstoreOutlined />,
		children: [
			{ key: '9', label: 'Option 9' },
			{ key: '10', label: 'Option 10' },
			{
				key: 'sub3',
				label: 'Submenu',
				children: [
					{ key: '11', label: 'Option 11' },
					{ key: '12', label: 'Option 12' },
				],
			},
		],
	},
];

const Sidebar: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);

	const toggleCollapsed = () => {
		setCollapsed(!collapsed);
	};

	return (
		<div style={{ width: 256 }}>
			<Button
				type='primary'
				onClick={toggleCollapsed}
				style={{ marginBottom: 16 }}
			>
				{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			</Button>
			<Menu
				defaultSelectedKeys={['1']}
				defaultOpenKeys={['sub1']}
				mode='inline'
				theme='dark'
				inlineCollapsed={collapsed}
				items={items}
			/>
		</div>
	);
};

export default Sidebar;

import cn from 'classnames';
import React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import './Switcher.scss';
import { selectIsSidebarOpen } from '../../../states/AppState/AppState.tsx';
import { useSelector } from 'react-redux';
import { useScreenMode } from '../../../hooks/useScreenMode.ts';

type SwitcherProps = {
	className?: string;
	onClick: () => void;
};

const MenuSwitcher: React.FC<SwitcherProps> = ({ className, onClick }) => {
	const isSidebarVisible = useSelector(selectIsSidebarOpen);

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 850;

	const menuRef = useRef<HTMLDivElement>(null);

	const onMenuClick = useCallback(() => {
		menuRef?.current?.classList.toggle('change');
		onClick();
	}, [onClick]);

	useEffect(() => {
		isSidebarVisible
			? menuRef?.current?.classList.add('change')
			: menuRef?.current?.classList.remove('change');
	}, [isSidebarVisible]);

	return (
		<div
			ref={menuRef}
			className={cn('switcher', className)}
			onClick={onMenuClick}
		>
			{!isWide && (
				<>
					<div className='bar1'></div>
					<div className='bar2'></div>
					<div className='bar3'></div>
				</>
			)}
		</div>
	);
};
export default MenuSwitcher;

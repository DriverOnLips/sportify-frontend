import { FilterOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { Space } from 'antd';
import HeaderSportsTypeFilter from './components/SportTypeFilter.tsx';
import HeaderGameLevelFilter from './components/GameLevelFilter.tsx';
import styles from './HeaderFilters.module.scss';
import HeaderDateFilter from './components/DateFilter.tsx';

const HeaderFilters = () => {
	return (
		<Popover
			trigger={['click']}
			content={<HeaderFiltersContent />}
		>
			<Space>
				<FilterOutlined />
			</Space>
		</Popover>
	);
};

const HeaderFiltersContent = () => {
	return (
		<div className={styles.header_filters__content}>
			<HeaderSportsTypeFilter />
			<HeaderGameLevelFilter />
			<HeaderDateFilter />
		</div>
	);
};

export default HeaderFilters;

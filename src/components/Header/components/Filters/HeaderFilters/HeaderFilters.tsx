import { FilterOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { Space } from 'antd';
import HeaderSportsTypeFilter from './components/SportTypeFilter.tsx';

const HeaderFilters = () => {
	return (
		<Popover content={<HeaderSportsTypeFilter />}>
			<Space>
				<FilterOutlined />
			</Space>
		</Popover>
	);
};
export default HeaderFilters;

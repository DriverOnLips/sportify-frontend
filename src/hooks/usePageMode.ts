import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

const useEditMode = () => {
	const location = useLocation();
	const { edit } = queryString.parse(location.search);

	return edit === 'true';
};

export default useEditMode;

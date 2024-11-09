import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTGWebAppStartPage } from '../../states/TGWebApp/TGWebAppState.ts';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
	const tgStartPage = useSelector(selectTGWebAppStartPage);
	const navigate = useNavigate();

	useEffect(() => {
		if (tgStartPage && tgStartPage == 'create_event') {
			navigate('/events-create');
		}
	}, [tgStartPage]);

	return <></>;
};

export default MainPage;

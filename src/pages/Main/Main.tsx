import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTGWebAppStartPage } from 'states/TGWebApp/TGWebAppState.ts';
import { useNavigate } from 'react-router-dom';
import {
	convertStringToTgStartPage,
	TgStartPage,
} from 'types/enums/TgStartPage.ts';

const MainPage: React.FC = () => {
	const tgStartPage = useSelector(selectTGWebAppStartPage);
	const navigate = useNavigate();

	const navigateToStartPage = (page: TgStartPage) => {
		switch (page) {
			case TgStartPage.EventCreate:
				navigate('/events-create');
				break;
			case TgStartPage.Events:
				navigate('/events');
				break;
			case TgStartPage.Map:
				navigate('/map');
				break;
		}
	};

	useEffect(() => {
		if (tgStartPage && tgStartPage !== '') {
			console.log('tgStartPage:', tgStartPage);

			navigateToStartPage(convertStringToTgStartPage(tgStartPage));
		}
	}, [tgStartPage]);

	return <></>;
};

export default MainPage;

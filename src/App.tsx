import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from './components/Menu/Menu.tsx';
import Header from './components/Header/Header.tsx';
import EventPage from 'pages/EventPage/EventPage.tsx';
import EventsList from 'pages/EventsList/EventsList.tsx';
import './App.scss';
import { useEnv } from './contexts/EnvContext.tsx';
import EventCreate from './pages/EventPage/components/EventCreate/EventCreate.tsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setParamsAction } from './states/TGWebApp/TGWebAppState.ts';
import MainPage from './pages/Main/Main.tsx';
import MapPage from './pages/MapPage/MapPage.tsx';

function App() {
	const dispatch = useDispatch();

	const { yandexMapApiKey } = useEnv();

	useEffect(() => {
		if (window.Telegram?.WebApp) {
			console.log('Using telegram webapp');

			window.Telegram.WebApp.ready();

			const userData = window.Telegram.WebApp.initDataUnsafe;
			dispatch(setParamsAction(userData));
		} else {
			console.warn('Using browser');
		}
	}, []);

	return (
		<div id='app'>
			<Helmet>
				<script
					src={`https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${yandexMapApiKey}`}
					type='text/javascript'
				/>
			</Helmet>

			<BrowserRouter basename='/'>
				<Header />
				<Sidebar />
				<div id='content'>
					<Routes>
						<Route
							path='/'
							element={<MainPage />}
						/>
						<Route
							path='/events'
							element={<EventsList />}
						/>
						<Route
							path='/events/:id'
							element={<EventPage />}
						/>
						<Route
							path='/events-create'
							element={<EventCreate />}
						/>
						<Route
							path='/map'
							element={<MapPage />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;

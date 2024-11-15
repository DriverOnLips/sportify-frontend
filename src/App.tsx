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
import MyEventsList from './pages/MyEventsList/MyEventsList.tsx';
import Login from './pages/Login/Login.tsx';
import UpcomingEventsList from './pages/UpcomingEventsList/UpcomingEventsList.tsx';
import PastEventsList from './pages/PastEventsList/PastEventsList.tsx';

function App() {
	const dispatch = useDispatch();

	const { yandexMapApiKey } = useEnv();

	useEffect(() => {
		if (window.Telegram?.WebApp) {
			window.Telegram.WebApp.ready();

			const userData = window.Telegram.WebApp.initDataUnsafe;
			dispatch(setParamsAction(userData));
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
							path='/events-my'
							element={<MyEventsList />}
						/>
						<Route
							path='/events-create'
							element={<EventCreate />}
						/>
						<Route
							path='/events-upcoming'
							element={<UpcomingEventsList />}
						/>
						<Route
							path='/events-past'
							element={<PastEventsList />}
						/>
						<Route
							path='/map'
							element={<MapPage />}
						/>
						<Route
							path='/login'
							element={<Login />}
						/>
						<Route
							path='/signup'
							element={<Login />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;

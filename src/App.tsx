import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from './components/Menu/Menu.tsx';
import Header from './components/Header/Header.tsx';
import EventPage from 'pages/EventPage/EventPage.tsx';
import EventsList from 'pages/EventsList/EventsList.tsx';
import './App.scss';
import { useEnv } from './contexts/EnvContext.tsx';
import EventCreate from './pages/EventPage/components/EventCreate/EventCreate.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setParamsAction } from './states/TGWebApp/TGWebAppState.ts';
import MainPage from './pages/Main/Main.tsx';
import MapPage from './pages/MapPage/MapPage.tsx';
import MyEventsList from './pages/MyEventsList/MyEventsList.tsx';
import Login from './pages/Login/Login.tsx';
import UpcomingEventsList from './pages/UpcomingEventsList/UpcomingEventsList.tsx';
import PastEventsList from './pages/PastEventsList/PastEventsList.tsx';
import Logout from './pages/Logout/Logout.tsx';
import useUserInfo from './hooks/useUserInfo.tsx';
import ProtectedRoute from './utils/ProtectedRoute.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { selectIsSidebarOpen } from './states/AppState/AppState.tsx';
import { useScreenMode } from './hooks/useScreenMode.ts';
import Profile from './pages/Profile/Profile.tsx';

function App() {
	const dispatch = useDispatch();

	const [isLoaded, setIsLoaded] = useState(false);
	const { isAuthorized, check } = useUserInfo();

	const isSidebarOpen = useSelector(selectIsSidebarOpen);

	const screenWidth = useScreenMode();
	const isWide = screenWidth > 850;

	const { yandexMapApiKey } = useEnv();

	const checkAuth = async () => {
		await check();
		// TODO: убрать нафиг это говно
		setTimeout(() => setIsLoaded(true), 100);
	};

	useEffect(() => {
		if (window.Telegram?.WebApp) {
			window.Telegram.WebApp.ready();

			const userData = window.Telegram.WebApp.initDataUnsafe;
			dispatch(setParamsAction(userData));
		}

		checkAuth();
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
				<AnimatePresence>
					<motion.div
						id='content'
						animate={{
							marginLeft: isWide ? '300px' : isSidebarOpen ? '80px' : 0,
						}}
						layout
					>
						{isLoaded && (
							<Routes>
								<Route
									path='/'
									element={<EventsList />} //TODO: желательно оформить главную страницу и вернуть роутинг на нее
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
									element={
										<ProtectedRoute isAuthorized={isAuthorized}>
											<MyEventsList />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/events-create'
									element={
										<ProtectedRoute isAuthorized={isAuthorized}>
											<EventCreate />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/events-upcoming'
									element={
										<ProtectedRoute isAuthorized={isAuthorized}>
											<UpcomingEventsList />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/events-past'
									element={
										<ProtectedRoute isAuthorized={isAuthorized}>
											<PastEventsList />
										</ProtectedRoute>
									}
								/>
								<Route
									path='/map'
									element={<MapPage />}
								/>
								<Route
									path='/profile/:id'
									element={<Profile />}
								/>
								<Route
									path='/login'
									element={<Login />}
								/>
								<Route
									path='/signup'
									element={<Login />}
								/>
								<Route
									path='/logout'
									element={<Logout />}
								/>
							</Routes>
						)}
					</motion.div>
				</AnimatePresence>
			</BrowserRouter>
		</div>
	);
}

export default App;

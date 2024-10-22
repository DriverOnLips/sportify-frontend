import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from './components/Menu/Menu.tsx';
import Header from './components/Header/Header.tsx';
import EventPage from 'pages/EventPage/EventPage.tsx';
import EventsList from 'pages/EventsList/EventsList.tsx';
import { UserProvider } from './contexts/User/userContext.tsx';
import './App.scss';
import { useEnv } from './contexts/EnvContext.tsx';

function App() {
	const { yandexMapApiKey } = useEnv();

	return (
		<div id='app'>
			<Helmet>
				<script
					src={`https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${yandexMapApiKey}`}
					type='text/javascript'
				/>
			</Helmet>

			<UserProvider>
				<BrowserRouter basename='/'>
					<Header />
					<Sidebar />
					<div
						id='content'
						style={{ marginLeft: '300px', paddingTop: '64px' }}
					>
						<Routes>
							<Route
								path='/'
								element={<EventsList />}
							/>
							<Route
								path='/event/:id'
								element={<EventPage />}
							/>
						</Routes>
					</div>
				</BrowserRouter>
			</UserProvider>
		</div>
	);
}

export default App;

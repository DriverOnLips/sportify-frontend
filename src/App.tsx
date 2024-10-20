import EventPage from 'pages/EventPage/EventPage.tsx';
import EventsList from 'pages/EventsList/EventsList.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Menu/Menu.tsx';

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
					<div id='content'>
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
					<Sidebar />
				</BrowserRouter>
			</UserProvider>
		</div>
	);
}

export default App;

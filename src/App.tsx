import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from './components/Menu/Menu.tsx';
import EventPage from 'pages/EventPage/EventPage.tsx';
import EventsList from 'pages/EventsList/EventsList.tsx';
import { UserProvider } from './contexts/User/userContext.tsx';
import './App.scss';

function App() {
	const apiKey = import.meta.env.VITE_YANDEX_MAP_API_KEY;

	return (
		<div id='app'>
			<Helmet>
				<script
					src={`https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}`}
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

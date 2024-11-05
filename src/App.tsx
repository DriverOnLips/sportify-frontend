import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Sidebar from './components/Menu/Menu.tsx';
import Header from './components/Header/Header.tsx';
import EventPage from 'pages/EventPage/EventPage.tsx';
import EventsList from 'pages/EventsList/EventsList.tsx';
import { UserProvider } from './contexts/User/userContext.tsx';
import './App.scss';
import { useEnv } from './contexts/EnvContext.tsx';
import EventCreate from './pages/EventPage/components/EventCreate/EventCreate.tsx';
import { Provider } from 'react-redux';
import store from './states/store.ts';

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

			<Provider store={store}>
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
							</Routes>
						</div>
					</BrowserRouter>
				</UserProvider>
			</Provider>
		</div>
	);
}

export default App;

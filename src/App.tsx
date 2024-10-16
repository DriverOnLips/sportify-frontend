import EventPage from 'pages/EventPage/EventPage.tsx';
import EventsList from 'pages/EventsList/EventsList.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Menu/Menu.tsx';

import './App.scss';
import { UserProvider } from './contexts/User/userContext.tsx';

function App() {
	return (
		<div id='app'>
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
							{/* <Route
						path='/not_found'
						element={<NotFound />}
					/>
					<Route
						path='*'
						element={<NotFound />}
					/> */}
						</Routes>
					</div>
					<Sidebar />
				</BrowserRouter>
			</UserProvider>
		</div>
	);
}

export default App;

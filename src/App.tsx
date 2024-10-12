import EventsList from 'pages/EventsList/EventsList.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventPage from 'pages/EventPage/EventPage.tsx';
import Sidebar from './components/Menu/Menu.tsx';

import './App.scss';

function App() {
	return (
		<div id='app'>
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
		</div>
	);
}

export default App;

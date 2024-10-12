import EventsList from 'pages/EventsList/EventsList.tsx';
import { Footer } from './components/Footer/Footer.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventPage from 'pages/EventPage/EventPage.tsx';
import './App.scss';

function App() {
	return (
		<div id='app'>
			<BrowserRouter basename='/'>
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
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;

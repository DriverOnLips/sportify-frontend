import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { EnvProvider } from './contexts/EnvContext.tsx';
import store from './states/store.ts';
import { Provider } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>
			<EnvProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</EnvProvider>
		</HelmetProvider>
	</React.StrictMode>,
);

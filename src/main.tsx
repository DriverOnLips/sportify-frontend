import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { UserProvider } from 'contexts/User/userContext.tsx';
import App from './App.tsx';
import { EnvProvider } from './contexts/EnvContext.tsx';
import store from './states/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>
			<EnvProvider>
				<Provider store={store}>
					<UserProvider>
						<App />
					</UserProvider>
				</Provider>
			</EnvProvider>
		</HelmetProvider>
	</React.StrictMode>,
);

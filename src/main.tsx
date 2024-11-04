import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import App from './App.tsx';
import { EnvProvider } from './contexts/EnvContext.tsx';
import { UserProvider } from './contexts/User/userContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HelmetProvider>
			<EnvProvider>
				<UserProvider>
					<App />
				</UserProvider>
			</EnvProvider>
		</HelmetProvider>
	</React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { EnvProvider } from './contexts/EnvContext.tsx';
import { UserProvider } from './contexts/User/userContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<EnvProvider>
			<UserProvider>
				<App />
			</UserProvider>
		</EnvProvider>
	</React.StrictMode>,
);

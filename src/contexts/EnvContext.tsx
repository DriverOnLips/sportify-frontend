import React, { createContext, useContext, ReactNode } from 'react';

interface EnvConfig {
	yandexMapApiKey: string;
	daDataApiKey: string;
}

const EnvContext = createContext<EnvConfig | undefined>(undefined);

interface EnvProviderProps {
	children: ReactNode;
}

export const EnvProvider: React.FC<EnvProviderProps> = ({ children }) => {
	const yandexMapApiKey = import.meta.env.VITE_YANDEX_MAP_API_KEY;
	const daDataApiKey = import.meta.env.VITE_DA_DATA_API_KEY;

	if (!yandexMapApiKey) {
		throw new Error(
			'VITE_YANDEX_MAP_API_KEY is not defined in the environment variables',
		);
	}
	if (!daDataApiKey) {
		throw new Error(
			'VITE_DA_DATA_API_KEY is not defined in the environment variables',
		);
	}

	const envConfig: EnvConfig = {
		yandexMapApiKey,
		daDataApiKey,
	};

	return (
		<EnvContext.Provider value={envConfig}>{children}</EnvContext.Provider>
	);
};

export const useEnv = (): EnvConfig => {
	const context = useContext(EnvContext);
	if (context === undefined) {
		throw new Error('useEnv must be used within an EnvProvider');
	}
	return context;
};

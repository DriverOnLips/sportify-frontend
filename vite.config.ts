import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import tsconfig from './tsconfig.json';

const SRC_PATH = path.resolve(__dirname, 'src');

const parseTsConfigPaths = (
	paths: Record<string, string[]>,
): Record<string, string> => {
	const webpackConfigAliases: Record<string, string> = {};

	Object.entries(paths).forEach(([alias, paths]) => {
		const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');

		webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
	});

	return webpackConfigAliases;
};

export default defineConfig({
	base: '/',
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:8080/',
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/api/, '/api/v1/'),
			},
		},
	},
	resolve: {
		alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
	},
});

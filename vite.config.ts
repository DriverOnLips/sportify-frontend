import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
			manifest: {
				name: 'Food Client',
				short_name: 'Food Client',
				description: 'Food Client PWA',
				icons: [
					{
						src: 'https://127.0.0.1/api/v1/img/default_football.jpeg',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'https://127.0.0.1/api/v1/img/default_football.jpeg',
						sizes: '512x512',
						type: 'any',
					},
					{
						src: 'https://127.0.0.1/api/v1/img/default_football.jpeg',
						sizes: '512x512',
						type: 'maskable',
					},
				],
				theme_color: '#ffffff',
				background_color: '#ffffff',
				// display: 'standalone',
				// scope: '/',
				// start_url: '/',
			},
		}),
	],
	server: {
		host: '0.0.0.0',
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:8080/',
				changeOrigin: true,
				secure: false,
				ws: true,
				rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
			},
		},
	},
	resolve: {
		alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
	},
});

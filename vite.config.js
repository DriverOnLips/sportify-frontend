import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfig from './tsconfig.json';
var SRC_PATH = path.resolve(__dirname, 'src');
var parseTsConfigPaths = function (paths) {
    var webpackConfigAliases = {};
    Object.entries(paths).forEach(function (_a) {
        var alias = _a[0], paths = _a[1];
        var aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');
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
                name: 'Sportify',
                short_name: 'Sportify',
                theme_color: '#ffffff',
                icons: [
                    {
                        src: 'pwa-64x64.png',
                        sizes: '64x64',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any',
                    },
                    {
                        src: 'maskable-icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable',
                    },
                ],
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
                rewrite: function (path) { return path.replace(/^\/api/, '/api/v1'); },
            },
        },
    },
    resolve: {
        alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
    },
});

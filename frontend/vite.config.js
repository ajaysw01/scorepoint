import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 50765,
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
            },
            output: {
                assetFileNames: (assetInfo) => {
                    if (/\.(gif|jpe?g|png|svg|ttf|woff2?)$/.test(assetInfo.name)) {
                        return 'assets/[name][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
        assetsInclude: [
            '**/*.ttf',
            '**/*.woff',
            '**/*.woff2',
            '**/*.png',
            '**/*.jpg',
            '**/*.svg',
            '**/*.gif',
            '**/*.json' ,
            '**/*.jpeg' 
        ],
    },
});

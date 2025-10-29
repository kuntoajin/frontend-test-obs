// eslint.config.js

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

// Konfigurasi ini diekspor sebagai array dari objek konfigurasi
export default [
    // 1. Konfigurasi Dasar JavaScript
    pluginJs.configs.recommended,

    // 2. Konfigurasi TypeScript
    ...tseslint.configs.recommended, // Menggunakan konfigurasi TypeScript dasar
    
    // 3. Konfigurasi untuk Browser/Lingkungan
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
    },

    // 4. Konfigurasi React
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            react: pluginReact,
            'react-hooks': pluginReactHooks,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // Aturan React yang direkomendasikan
            ...pluginReact.configs.recommended.rules,
            
            // Aturan React Hooks yang direkomendasikan
            ...pluginReactHooks.configs.recommended.rules,

            // Aturan tambahan (Contoh: Matikan prop-types karena kita pakai TypeScript)
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off', 
        },
    },

    // 5. Konfigurasi Prettier (HARUS ADA DI AKHIR ARRAY)
    // Ini mematikan semua aturan ESLint yang bertentangan dengan Prettier
    prettierConfig,

    // 6. Aturan Ignore
    {
        ignores: ['dist/', 'node_modules/', '.next/'],
    }
];
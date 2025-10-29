// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config(
  // base configs
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    ignores: ['dist', 'build', 'node_modules', '**/*.test.*', '**/*.spec.*'],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tseslint.parser, // ⬅️ penting banget
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      prettier,
    },

    rules: {
      // recommended base rules
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // react-specific
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',

      // accessibility
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',

      // prettier integration
      'prettier/prettier': 'error',

      // TypeScript strict rules (including no-explicit-any)
      '@typescript-eslint/no-explicit-any': 'error',
    },

    settings: {
      react: { version: 'detect' },
    },
  }
);

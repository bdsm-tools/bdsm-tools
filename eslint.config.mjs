import react from 'eslint-plugin-react';
import cssModules from 'eslint-plugin-css-modules';
import reactThree from '@react-three/eslint-plugin';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/dist/', '**/api/', 'src/data/'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:css-modules/recommended',
    'plugin:@react-three/recommended',
  ),
  {
    plugins: {
      react,
      'css-modules': cssModules,
      '@react-three': reactThree,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 11,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: '18',
      },
    },

    rules: {
      'react/prop-types': ['off'],
      'react/no-unescaped-entities': ['off'],
      'react/display-name': ['off'],
    },
  },
];

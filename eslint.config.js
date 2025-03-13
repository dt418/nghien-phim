import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import simpleImportSort from 'eslint-plugin-simple-import-sort'; // Plugin to sort imports and exports
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const patchedConfig = fixupConfigRules([
  ...compat.extends(
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'next',
    'next/core-web-vitals',
    'next/typescript'
  ),
]);

const config = [
  ...patchedConfig,
  prettierConfigRecommended,
  {
    ignores: [
      '**/build/',
      '**/dist/',
      '**/out/',
      '**/node_modules/',
      '**/coverage/',
      '**/.cache/',
      '**/.next/',
      '**/.env',
      '**/.env.*',
      '**/.idea/',
      '**/.vscode/',
      '**/*.test.js',
      '**/*.spec.js',
      '**/vite.config.ts',
      '**/public/',
      '**/static/',
      '**/*.d.ts',
    ],
  },

  {
    plugins: {
      'simple-import-sort': simpleImportSort, // Plugin for sorting imports
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },

      parser: tsParser,
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true,
      },
    },

    rules: {
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.mjs', '*.cjs'],
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          /**
           * Import Sorting Groups
           *
           * Organizes imports into logical groups to maintain consistency and readability.
           *
           * @type {Array<Array<string>>}
           */
          groups: [
            // Packages come first.
            ['^react', '^next', '^\\w'],
            // Internal packages.
            ['^@store(/.*|$)'],
            ['^@components(/.*|$)'],
            ['^@ui(/.*|$)'],
            ['^@lib(/.*|$)'],
            ['^@pages(/.*|$)'],
            ['^@utils(/.*|$)'],
            ['^@hooks(/.*|$)'],
            ['^@services(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports. Put `..` last.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports. Put same-folder imports and `.` last.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.?(css)$'],
          ],
        },
      ],
    },
  },
];

export default config;

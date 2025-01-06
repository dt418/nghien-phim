import react from 'eslint-plugin-react'; // React plugin for ESLint
import simpleImportSort from 'eslint-plugin-simple-import-sort'; // Plugin to sort imports and exports
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
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
      '**/*.config.js',
      '**/vite.config.ts',
      '**/public/',
      '**/static/',
      '**/*.d.ts',
    ],
  },
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      react, // Enables React-specific linting rules
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

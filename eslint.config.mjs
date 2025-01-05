import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc'; // Compatibility utility for ESLint configuration
import js from '@eslint/js'; // Basic JavaScript configuration from ESLint
import tsParser from '@typescript-eslint/parser'; // TypeScript parser for ESLint
import react from 'eslint-plugin-react'; // React plugin for ESLint
import simpleImportSort from 'eslint-plugin-simple-import-sort'; // Plugin to sort imports and exports
import globals from 'globals'; // Provides common global variables (e.g., browser, node)

// Get the directory name and file name to configure compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initialize FlatCompat with the base directory for compatibility with older ESLint configurations.
 *
 * @type {FlatCompat} compat - Provides backward compatibility with legacy ESLint configurations.
 */
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended, // Default recommended configuration
  allConfig: js.configs.all, // Comprehensive configuration for JS
});

/**
 * ESLint Configuration Array
 *
 * Each object within this array defines a separate part of the configuration,
 * including file-specific rules, global options, and plugin configurations.
 *
 * @type {Array<Object>}
 */
const config = [
  {
    /**
     * Ignored Paths
     *
     * Specifies paths to ignore during linting, typically directories for dependencies and build artifacts.
     *
     * @property {string[]} ignores - Array of paths to ignore.
     */
    ignores: ['**/node_modules', '**/dist', '**/build'],
  },
  ...compat.extends(
    'next/core-web-vitals', // Next.js recommended settings for web vitals
    'eslint:recommended', // Standard recommended ESLint rules
    'plugin:@typescript-eslint/eslint-recommended', // TypeScript recommended rules
    'plugin:@typescript-eslint/recommended' // Additional recommended TypeScript rules
  ),
  {
    /**
     * Plugin and Language Configuration
     *
     * Configures plugins for React and import sorting, and specifies language options.
     *
     * @property {Object} plugins - Plugins used in the configuration.
     * @property {Object} languageOptions - Parser and global variables setup.
     */
    plugins: {
      react, // Enables React-specific linting rules
      'simple-import-sort': simpleImportSort, // Plugin for sorting imports
    },
    languageOptions: {
      globals: {
        ...globals.browser, // Browser globals like `window`
        ...globals.node, // Node.js globals like `require`
        ...globals.jest, // Jest testing framework globals
      },
      parser: tsParser, // Specify TypeScript parser
    },
    rules: {
      'simple-import-sort/imports': 'error', // Enforce sorting of imports
      'simple-import-sort/exports': 'error', // Enforce sorting of exports
    },
  },
  {
    /**
     * File-Specific Rules
     *
     * Specifies additional import sorting rules for different file types.
     *
     * @property {string[]} files - Glob patterns for JavaScript and TypeScript files.
     * @property {Object} rules - ESLint rules applied to specified files.
     */
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
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
            ['^react', '^next', '^@?\\w'], // External libraries (React, Next.js, etc.)
            ['^(@|components)(/.*|$)'], // Custom imports starting with "@" or "components"
            ['^\\u0000'], // Side effect imports (like CSS imports)
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports (../)
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Relative imports (./)
            ['^.+\\.?(css)$'], // Style imports (.css files)
          ],
        },
      ],
    },
  },
];

export default config;

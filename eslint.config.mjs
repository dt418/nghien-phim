import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import react from 'eslint-plugin-react'; // React plugin for ESLint
import simpleImportSort from 'eslint-plugin-simple-import-sort'; // Plugin to sort imports and exports
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const config = [{
    ignores: [
        "**/build/",
        "**/dist/",
        "**/out/",
        "**/node_modules/",
        "**/coverage/",
        "**/.cache/",
        "**/.next/",
        "**/.env",
        "**/.env.*",
        "**/.idea/",
        "**/.vscode/",
        "**/*.test.js",
        "**/*.spec.js",
        "**/*.config.js",
        "**/vite.config.ts",
        "**/public/",
        "**/static/",
        "**/*.d.ts",
    ],
}, ...compat.extends(
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
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
            version: "detect",
        },
    },

    rules: {
        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        }],

        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/ban-ts-comment": "warn",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
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

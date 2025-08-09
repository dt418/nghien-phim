import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default antfu({
  react: true,
  typescript: true,
  stylistic: true,
  tailwindcss: true,
  jsx: true,
  type: 'app',
  yaml: false,
  jsonc: false,
  perfectionist: false,
  ignores: [
    '**/dist/**',
    '**/node_modules/**',
    '**/coverage/**',
    '**/public/**',
    '**/build/**',
    '**/temp/**',
    '**/.next/**',
    '**/out/**',
    '**/.vercel/**',
    '**/next-env.d.ts',
    '**/pnpm-lock.yaml',
    '**/.pnpm/**',
    '**/fixtures',
  ],
  plugins: {
    '@next/next': nextPlugin,
    'simple-import-sort': simpleImportSort,
  },
  // Additional modern ESLint rules
  rules: {
    'ts/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'arrow-body-style': ['error', 'as-needed'],

    'import/order': 'off',
    'sort-imports': 'off',
    'perfectionist/sort-objects': 'off',
    'perfectionist/sort-arrays': 'off',
    'perfectionist/sort-enums': 'off',
    'perfectionist/sort-union-types': 'off',
    'perfectionist/sort-intersection-types': 'off',
    'perfectionist/sort-tuples': 'off',
    'perfectionist/sort-named-exports': 'off',
    'perfectionist/sort-named-imports': 'off',
    'perfectionist/sort-interfaces': 'off',
    'perfectionist/sort-jsx-props': 'off',
    'perfectionist/sort-maps': 'off',
    'perfectionist/sort-object-types': 'off',
    'perfectionist/sort-destructured-arrays': 'off',
    'perfectionist/sort-destructured-objects': 'off',
    'perfectionist/sort-classes': 'off',
    'perfectionist/sort-union-enums': 'off',
    'perfectionist/sort-imports': 'off',
    'simple-import-sort/imports': ['error', {
      groups: [
        // Nodejs bultins
        ['^node:'],
        // React imports
        ['^react', '^react-dom', '^tailwindcss'],
        // Next.js and related
        ['^next', '^next-auth'],
        // Node.js built-ins and external packages
        ['^@?\\w'],
        // Side effect imports
        ['^\\u0000'],
        // Aliases (e.g. ~/)
        ['^~/components'],
        ['^~/config'],
        ['^~/domains'],
        ['^~/hooks'],
        ['^~/lib'],
        ['^~/providers'],
        ['^~/types'],
        // Relative imports
        ['^\\.'],
        // Style imports
        ['^.+\\.s?css$'],
      ],
    }],
    'simple-import-sort/exports': 'error',

    'react/destructuring-assignment': 'off',
    'react/react-in-jsx-scope': 'off',
    'ts/no-use-before-define': 'off',
    'react-refresh/only-export-components': 'off',

    'unicorn/prefer-node-protocol': 'off',

    // Next.js rules
    ...nextPlugin.configs.recommended.rules,
    ...nextPlugin.configs['core-web-vitals'].rules,

    '@next/next/no-html-link-for-pages': 'error',
  },
  // Enable modern JavaScript features
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      alias: {
        map: [['~', './src']],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
})

import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwindcss from 'eslint-plugin-tailwindcss'

export default antfu({
  react: true,
  typescript: true,
  stylistic: true,
  tailwindcss: true,
  jsx: true,
  type: 'app',
  yaml: false,
  jsonc: false,
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
    tailwindcss,
    '@next/next': nextPlugin,
    // 'perfectionist': perfectionistNatural,
    'simple-import-sort': simpleImportSort,
  },
  // Additional modern ESLint rules
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'arrow-body-style': ['error', 'as-needed'],

    // 'import/order': 'off', // handled by perfectionist
    // 'sort-imports': 'off', // handled by perfectionist
    // 'perfectionist/sort-imports': [
    //   'error',
    //   {
    //     type: 'alphabetical',
    //     order: 'asc',
    //   },
    // ],

    'import/order': 'off',
    'sort-imports': 'off',
    'perfectionist/sort-imports': 'off',
    'perfectionist/sort-objects': 'off',
    'perfectionist/sort-arrays': 'off',
    'simple-import-sort/imports': ['error', {
      groups: [
        // Nodejs bultins
        ['^node:'],
        // React imports
        ['^react', '^react-dom'],
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

    'react/prefer-destructuring-assignment': 'off',
    'react/react-in-jsx-scope': 'off',
    'ts/no-use-before-define': 'off',
    'react-refresh/only-export-components': 'off',
    'react-dom/no-dangerously-set-innerhtml': 'off',
    'react-dom/no-missing-iframe-sandbox': 'off',
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

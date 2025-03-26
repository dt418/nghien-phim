import antfu from '@antfu/eslint-config'
import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import tailwindcss from 'eslint-plugin-tailwindcss'

export default antfu({
  react: true,
  typescript: true,
  stylistic: true,
  type: 'app',
  yaml: false,
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
  ],
  plugins: {
    '@stylistic': stylistic,
    tailwindcss,
    perfectionist,
  },
  // Additional modern ESLint rules
  rules: {
    'no-unused-vars': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'arrow-body-style': ['error', 'as-needed'],

    // Perfectionist import sorting (more detailed than standard import/order)
    'perfectionist/sort-imports': 'error',
    // Remove the standard import/order as perfectionist replaces it
    'import/order': 'off',
    'react/prefer-destructuring-assignment': 'off',
    'react/react-in-jsx-scope': 'off',
    'ts/no-use-before-define': 'off',
    'react-refresh/only-export-components': 'off',
    'react-dom/no-dangerously-set-innerhtml': 'off',
    'react-dom/no-missing-iframe-sandbox': 'off',
    'unicorn/prefer-node-protocol': 'off',
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

import react from '@vitejs/plugin-react'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      all: true,
      exclude: [
        'node_modules/**',
        '.next/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/types/**',
      ],
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    exclude: ['node_modules', '.next', 'dist'],
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
})

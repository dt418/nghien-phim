import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['node_modules', '.next', 'dist'],
    coverage: {
      exclude: [
        'node_modules/**',
        '.next/**',
        'dist/**',
        '**/*.d.ts',
        '**/*.test.{js,jsx,ts,tsx}',
        '**/types/**',
      ],
      reporter: ['text', 'json', 'html'],
      all: true,
    },
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

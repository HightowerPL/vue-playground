import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  resolve:{
    alias: {
      '@' : path.resolve(__dirname, './src/'),
    },
  },
  plugins: [
    vue(),
    svgLoader()
  ],
  optimizeDeps: {
    exclude: ["oh-vue-icons/icons"]
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    // setupFiles: './src/tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/types/**',
        '**/*.d.ts',
        'vite.config.ts',
        'tailwind.config.js',
      ]
    }
  }
})

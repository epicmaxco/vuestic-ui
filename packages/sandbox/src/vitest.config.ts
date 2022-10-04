import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue() as any],
  test: {
    environment: 'jsdom',
  },
})
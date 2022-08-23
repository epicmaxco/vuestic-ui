import { defineConfig } from 'vite'
import createViteConfig from '../common-config'

export default () => {
  return defineConfig({
    ...createViteConfig('iife'),
  })
}

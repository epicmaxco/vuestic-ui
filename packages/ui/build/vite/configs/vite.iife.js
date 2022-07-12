import { defineConfig } from 'vite'
import getViteConfig from '../common-config'

export default ({ mode }) => {
  return defineConfig({
    ...getViteConfig(mode === 'production', 'iife'),
  })
}

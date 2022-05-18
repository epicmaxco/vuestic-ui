import { defineConfig } from 'vite'
import getViteConfig from '../common-config'

export default ({ mode }) => {
  const format = 'iife'

  return defineConfig({
    ...getViteConfig(mode === 'production', format),
  })
}

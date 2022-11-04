import { resolve } from 'pathe'
import { addPluginTemplate, addPlugin } from '@nuxt/kit'

export const usePlugin = () => {
  const pluginPath = resolve(__dirname, './plugin/plugin.ts')

  addPlugin({
    src: pluginPath,
  })
}
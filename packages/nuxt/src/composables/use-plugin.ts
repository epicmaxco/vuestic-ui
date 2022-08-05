import { addPluginTemplate } from '@nuxt/kit'
import { resolve } from '../utils'
import type { VuesticOptions } from './../types'

/** Register vuestic nuxt plugin */
export const useVuesticPlugin = (options: VuesticOptions) => {
  const pluginPath = resolve('./runtime/plugin.mjs')
  addPluginTemplate({
    src: pluginPath,
    filename: pluginPath.split('/').pop(),

    // Use JSON.stringify() here, because it will be inserted in ejs template as string. Then we will JSON.parse it.
    options: {
      value: JSON.stringify(options)
    }
  })
}

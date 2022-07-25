import type { VuesticOptions } from './../types';
import { addPluginTemplate } from '@nuxt/kit'

import { resolve } from 'pathe'
import { distDir } from '../dirs'

/** Register vuestic nuxt plugin */
export const useVuesticPlugin = (options: VuesticOptions) => {
  addPluginTemplate({
    src: resolve(distDir, './runtime/plugin.mjs'),
    filename: 'plugin.mjs',

    // Use JSON.stringify() here, because it will be inserted in ejs template as string. Then we will JSON.parse it.
    options: {
      value: JSON.stringify(options),
    },
  })
}

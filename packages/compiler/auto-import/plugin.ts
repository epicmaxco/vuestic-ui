import { transform } from '@vue/compiler-core'
import Components from 'unplugin-vue-components/vite'
import { isEntryFile } from '../shared/plugin/is-entry-file'
import { Plugin } from 'vite'
import { addImport, addVuePlugin, hasImport, hasVuePlugin } from '../shared/plugin/js'
import { MagicString } from '@vue/compiler-sfc'
import { logger } from '../logger'
import { formatString } from '../shared/color'

function installVuesticEssentialPlugin(ms: MagicString) {
  // Install vuestic essential plugin if not already installed
  if (!hasImport(ms, { named: 'createVuesticEssential', from: 'vuestic-ui' })) {
    addImport(ms, `import { createVuesticEssential } from 'vuestic-ui'`)
  }

  if (!hasVuePlugin(ms, 'createVuesticEssential')) {
    addVuePlugin(ms, 'createVuesticEssential()')
  }

  return ms
}

function installVuesticEssentialStyles(ms: MagicString) {
  // Add styles if not already imported
  if (!hasImport(ms, 'vuestic-ui/css')) {
    addImport(ms, `import 'vuestic-ui/css'`)
  }

  return ms
}

export const vuesticAutoImport = (options: { prefix?: string } = { prefix: 'Va' }) => {
  const prefix = options.prefix || 'Va'

  return [
    {
      name: 'vuestic:auto-import',

      enforce: 'pre',

      transform(code, id) {
        if (!isEntryFile(id)) {
          return
        }

        const ms = new MagicString(code)

        installVuesticEssentialPlugin(ms)
        installVuesticEssentialStyles(ms)

        return {
          code: ms.toString(),
          map: ms.generateMap({ hires: true }),
        }
      }
    } satisfies Plugin,
    Components({
      dts: 'node_modules/.vuestic/components.d.ts',
      resolvers: [
        (componentName) => {
          if (componentName.startsWith(prefix))
            return { name: componentName, from: 'vuestic-ui' }
        },
      ],
    }) as Plugin
  ]
}

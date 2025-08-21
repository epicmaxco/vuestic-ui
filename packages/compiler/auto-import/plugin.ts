import Components from 'unplugin-vue-components/vite'
import { isEntryFile } from '../shared/plugin/is-entry-file'
import { Plugin } from 'vite'
import { addImport, addVuePlugin, hasImport, hasVuePlugin } from '../shared/plugin/js'
import { MagicString } from '@vue/compiler-sfc'

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

function installVuesticEssentialStyles(ms: MagicString, options: { typography?: boolean }) {
  // Add styles if not already imported
  if (!hasImport(ms, 'vuestic-ui/styles/essential.css')) {
    addImport(ms, `import 'vuestic-ui/styles/essential.css'`)
  }

  if (options.typography) {
    if (!hasImport(ms, 'vuestic-ui/styles/typography.css')) {
      addImport(ms, `import 'vuestic-ui/styles/typography.css'`)
    }
  }

  return ms
}

export const vuesticAutoImport = (options: {
  typography?: boolean
} = {}) => {
  // TODO: Make optional prefix
  const prefix = 'Va'

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
        installVuesticEssentialStyles(ms, options)

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

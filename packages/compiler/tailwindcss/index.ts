import { MagicString } from '@vue/compiler-sfc';
import { Plugin } from 'vite';
import { tryToReadConfig } from '../shared/vuestic-config';
import { colorsPreset } from 'vuestic-ui'

const kebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const defaultColors = Object.keys(colorsPreset.light)

function addCssVariables(colors: Record<string, string>): string {
  const colorVariables = [...defaultColors, ...Object.keys(colors)].map((key) => `--color-${kebabCase(key)}: var(--va-${kebabCase(key)});`).join('\n  ');

  return `
@theme {
  ${colorVariables}
}
`
}

const TAILWIND_CSS_IMPORT_TEMPLATE = `@import "tailwindcss";`

export const vuesticTailwind = () => {
  let server: import('vite').ViteDevServer

  return {
    name: 'vuestic:tailwindcss',

    enforce: 'pre',

    configResolved(config) {
      const tailwindPluginIndex = config.plugins.findIndex((p) => p.name === '@tailwindcss/vite:scan')
      const vuesticTailwindPluginIndex = config.plugins.findIndex((p) => p.name === 'vuestic:tailwindcss')

      if (tailwindPluginIndex !== -1 && vuesticTailwindPluginIndex !== -1 && tailwindPluginIndex < vuesticTailwindPluginIndex) {
        console.warn('[Vuestic] vuestic:tailwindcss plugin should be placed before tailwindcss plugin in the Vite config plugins array.')
      }
    },

    configureServer(_s) {
      server = _s;
    },

    async transform(code, id, options) {
      if (!id.endsWith('css')) {
        return
      }

      if (!code.includes(TAILWIND_CSS_IMPORT_TEMPLATE)) {
        return
      }

      const ms = new MagicString(code);

      const config = (await tryToReadConfig()) ?? { colors: { variables: {} } };

      ms.appendRight(code.indexOf(TAILWIND_CSS_IMPORT_TEMPLATE) + TAILWIND_CSS_IMPORT_TEMPLATE.length, addCssVariables(config.colors.variables));

      return {
        code: ms.toString(),
        map: ms.generateMap()
      }
    },
  } as Plugin
}

import { readFile, writeFile } from 'fs/promises';
import { MagicString } from '@vue/compiler-sfc';
import { Plugin } from 'vite';
import { watchVuesticConfigOnce } from '../shared/vuestic-config';
import { colorsPreset } from 'vuestic-ui'
import { logger } from '../logger';

const kebabCase = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

const defaultColors = Object.keys(colorsPreset.light)

function uniqueArray<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

function addCssVariables(colors: Record<string, string>): string {
  const colorVariables = uniqueArray([...defaultColors, ...Object.keys(colors)]).map((key) => `--color-${kebabCase(key)}: var(--va-${kebabCase(key)});`).join('\n  ');

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
        logger.warn('[Vuestic] vuestic plugin should be placed before tailwindcss plugin in the Vite config plugins array.', { timestamp: true });
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

      const config = (await watchVuesticConfigOnce(async () => {
        // trigger full re-transform of id
        await writeFile(id, ((await readFile(id)).toString()))

        server?.ws.send({ type: 'full-reload', path: '*' });
      })) ?? { colors: { variables: {} } };

      ms.appendRight(code.indexOf(TAILWIND_CSS_IMPORT_TEMPLATE) + TAILWIND_CSS_IMPORT_TEMPLATE.length, addCssVariables(config.colors.variables));

      return {
        code: ms.toString(),
        map: ms.generateMap()
      }
    },
  } as Plugin
}

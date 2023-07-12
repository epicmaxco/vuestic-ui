import MagicString from 'magic-string';
import { defineVitePlugin } from './../utils/define-vite-plugin';

export const replaceNext = defineVitePlugin({
  name: 'vuestic:replace-next-line',

  enforce: 'pre',

  transform(code, id) {
    if (!(id.endsWith('.ts') || id.endsWith('.js'))) {
      return
    }

    if (id.includes('node_modules')) {
      return
    }

    let s = new MagicString(code);

    s = s.replaceAll(/\/\/\s?@replace-next-line:\s?(.*)\n(.*)/gm, '$1');

    return {
      code: s.toString(),
      map: s.generateMap({ hires: true }),
    };
  }
})
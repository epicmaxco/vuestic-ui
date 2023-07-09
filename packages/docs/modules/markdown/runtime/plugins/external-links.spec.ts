import { it, describe, expect } from 'vitest';
import { marked } from 'marked';
import { fixTargetLinks } from './external-links';

describe('externalLinkMarkedPlugin', () => {
  it('targetBlankPlugin: adds target="_blank" to links', () => {
    const markdown = `[vue-press](https://vuepress.vuejs.org/)[[target=_blank]]`;
    const html = fixTargetLinks(marked(markdown));

    expect(/target="_blank"/.test(html)).toBeTruthy();
  });
})


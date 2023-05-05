import { it, describe, expect } from 'vitest';
import { marked } from 'marked';
import { externalLinkMarkedPlugin } from './external-links';

describe('externalLinkMarkedPlugin', () => {
  it('targetBlankPlugin: adds target="_blank" to links', () => {
    marked.use(externalLinkMarkedPlugin());

    const markdown = `[vue-press](https://vuepress.vuejs.org/)[[target=_blank]]`;
    const html = marked(markdown);

    expect(/target="_blank"/.test(html)).toBeTruthy();
  });
})


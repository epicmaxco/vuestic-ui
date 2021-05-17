import { ApiDocsBlock } from '../../../../types/configTypes'
import { DocsHelper } from '../../../../helpers/DocsHelper'
import { t } from '@/helpers/I18nHelper'

const display1 = `
<h1 class="display-1">Display 1 Heading</h1>
`
const display2 = `
<h2 class="display-2">Display 2 Heading</h2>
`
const display3 = `
<h3 class="display-3">Display 3 Heading</h3>
`
const display4 = `
<h4 class="display-4">Display 4 Heading</h4>
`
const display5 = `
<h5 class="display-5">Display 5 Heading</h5>
`
const title = `
<div class="title">Title heading</div>
`
const primary = `
<div>Of all of the celestial bodies that capture our attention and fascination as astronomers, none has a greater influence on life on planet Earth than it’s own satellite, the moon. When you think about it.</div>
`
const secondary = `
<div class="text--secondary">Of all of the celestial bodies that capture our attention and fascination as astronomers, none has a greater influence on life on planet Earth than it’s own satellite, the moon. When you think about it.</div>
`
const codeSnippet = `
<pre class="code-snippet">&lt;p class=“code-snippet”>
  This is a wonderful example.
  &lt;a href=“#” onClick=“”>Read more&lt;/a>
&lt;/p></pre>
`
const textCode = `
<div><span class="text--code">currentColor</span> none has a greater influence on life on planet
                Earth than it’s own satellite, the moon.</div>
`

const lists = `
<p class="display-2">Lists</p>
`
const orderedLists = `
<div>
<ol class="va-ordered">
              <li>Of all of the celestial bodies that capture our attention and fascination as astronomers, none has a greater influence.</li>
              <li>Earth than it’s own satellite, the moon. When you think about it.</li>
              <li>Attention and fascination as.</li>
            </ol>
            <ol class="va-ordered">
              <li>Coffee</li>
              <li>Tea
                <ol class="va-ordered">
                  <li>Black tea
                    <ol class="va-ordered">
                      <li>Brooke Bond</li>
                      <li>Lipton</li>
                    </ol>
                  </li>
                  <li>Green tea
                    <ol class="va-ordered">
                      <li>Greenfield</li>
                      <li>Tess</li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>Milk</li>
            </ol>
            </div>
`

const unorderedLists = `
<div>
<ul class="va-unordered">
              <li>Of all of the celestial bodies that capture our attention and fascination as astronomers, none has a greater influence.</li>
              <li>Earth than it’s own satellite, the moon. When you think about it.</li>
              <li>Attention and fascination as .</li>
            </ul>
            <ul class="va-unordered">
              <li>Coffee</li>
              <li>Tea
                <ul class="va-unordered">
                  <li>Black tea
                    <ul class="va-unordered">
                      <li>Brooke Bond</li>
                      <li>Lipton</li>
                    </ul>
                  </li>
                  <li>Green tea
                    <ul class="va-unordered">
                      <li>Greenfield</li>
                      <li>Tess</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>Milk</li>
            </ul>
            </div>
`

const links = `
<p class="display-2">Links</p>
`
const link = `
<a href="#" class="link">Default Link</a>
`
const linkSecondary = `
<a href="#" class="link-secondary">Default Link</a>
`
const otherElements = `
<p class="display-2">Other Elements</p>
`
const textHighlighted = `
<p>None has a greater influence on
                <span class="text--highlighted">highlighted text</span>
                life on planet Earth than it’s own satellite, the selected chunk of text.
                When you think about it.
              </p>
`
const blockquote = `
<blockquote class="va-blockquote" :style="{borderColor: theme.primary}">
                <p>
                  BQ: Let’s talk about meat fondue recipes and what you need to know
                  first. Meat fondue also known as oil fondue is a method of cooking
                  all kinds.
                </p>
                <p>
                  <i>— Mister Lebowski</i>
                </p>
              </blockquote>
`
const textBlock = `
<div class="text-block">
                <p class="display-3">Display-3 Heading</p>
                <span>Of all of the celestial bodies that capture our
                  attention and fascination as astronomers, none has a greater
                  influence on life on planet Earth than it’s own satellite,
                  the moon. When you think about it.</span>
              </div>
`
export default [
  DocsHelper.title('typography.title'),
  DocsHelper.paragraph('typography.description'),
  DocsHelper.subtitle('typography.headings'),
  DocsHelper.table(
    [{ title: t('typography.headings'), type: 'markdown' }, { title: 'affected', type: 'markdown' }],
    [
      [display1, t('typography.display1')],
      [display2, t('typography.display2')],
      [display3, t('typography.display3')],
      [display4, t('typography.display4')],
      [display5, t('typography.display5')],
      [title, t('typography.titled')],
      [primary, t('typography.primary')],
      [secondary, t('typography.secondary')],
      [codeSnippet, t('typography.codeSnippet')],
      [textCode, t('typography.textCode')],
    ]),
  DocsHelper.subtitle('typography.other'),
  DocsHelper.table(
    [{ title: t('typography.other'), type: 'markdown' }, { title: 'affected', type: 'markdown' }],
    [
      [lists, ''],
      [orderedLists, t('typography.orderedLists')],
      [unorderedLists, t('typography.unorderedLists')],
      [links, ''],
      [link, t('typography.link')],
      [linkSecondary, t('typography.linkSecondary')],
      [otherElements, ''],
      [textHighlighted, t('typography.textHighlighted')],
      [blockquote, t('typography.blockquote')],
      [textBlock, t('typography.textBlock')],
    ]),
] as ApiDocsBlock[]

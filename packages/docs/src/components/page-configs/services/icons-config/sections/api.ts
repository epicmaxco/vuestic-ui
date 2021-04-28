import { DocsHelper } from '../../../../../helpers/DocsHelper'
import { te, t } from '../../../../../helpers/I18nHelper'

const prefix = (text: string) => {
  const stringPath = `iconsConfig.api.${text}`
  // Check if exists
  return te(stringPath) ? t(stringPath) : ''
}

export const config = [
  DocsHelper.subtitle(prefix('title')),

  DocsHelper.table(
    ['Prop', { title: 'Type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['name', 'string | RegExp', prefix('name')],
      [
        'iconClass',
        'string | ((...dynamicSegments: string[]) => string) | undefined',
        prefix('iconClass'),
      ],
      [
        'content',
        'string | ((...dynamicSegments: string[]) => string | undefined) | undefined',
        prefix('content'),
      ],
      [
        'component',
        '`VueComponent | undefined`',
        prefix('component'),
      ],
      [
        'componentProps',
        '`Record<string, any> | ((...dynamicSegments: string[]) => Record<string, any>) | undefined`',
        prefix('componentProps'),
      ],
      ['to', '`string | undefined`', prefix('to')],
      ['tag', '`string | undefined`', prefix('tag')],
      ['color', '`string | undefined`', prefix('color')],
      ['rotation', '`number | string | undefined`', prefix('rotation')],
      ['spin', "`'clockwise' | 'counter-clockwise' | undefined`", prefix('spin')],
      // ['', '', ''],
    ],
  ),
]

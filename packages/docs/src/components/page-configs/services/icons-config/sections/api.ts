import { DocsHelper } from '../../../../../helpers/DocsHelper'

export const config = [
  DocsHelper.subtitle('iconsConfig.api.title'),

  DocsHelper.table(
    ['Prop', { title: 'Type', type: 'code' }, { title: 'Description', type: 'markdown' }],
    [
      ['name', 'string | RegExp', 'iconsConfig.api.name'],
      [
        'iconClass',
        'string | ((...dynamicSegments: string[]) => string) | undefined',
        'iconsConfig.api.iconClass',
      ],
      [
        'content',
        'string | ((...dynamicSegments: string[]) => string | undefined) | undefined',
        'iconsConfig.api.content',
      ],
      [
        'component',
        '`VueComponent | undefined`',
        'iconsConfig.api.component',
      ],
      [
        'componentProps',
        '`Record<string, any> | ((...dynamicSegments: string[]) => Record<string, any>) | undefined`',
        'iconsConfig.api.componentProps',
      ],
      ['to', '`string | undefined`', 'iconsConfig.api.to'],
      ['tag', '`string | undefined`', 'iconsConfig.api.tag'],
      ['color', '`string | undefined`', 'iconsConfig.api.color'],
      ['rotation', '`number | string | undefined`', 'iconsConfig.api.rotation'],
      ['spin', "`'clockwise' | 'counter-clockwise' | undefined`", 'iconsConfig.api.spin'],
      // ['', '', ''],
    ],
  ),
]

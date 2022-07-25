import { ApiDocsBlock } from '@/types/configTypes'
import { PageGenerationHelper } from '@/helpers/DocsHelper'
import type { RoadmapItem } from './types'

const block = new PageGenerationHelper(__dirname)

const config: ApiDocsBlock[] = [
  block.title('roadmap.title'),
  block.paragraph('roadmap.description'),
  block.subtitle('roadmap.inDevelopment.title'),
  block.paragraph('roadmap.inDevelopment.description'),

  block.component('roadmap', {
    bind: {
      roadmap: [
        {
          title: 'Dark theme',
          type: 'service',
          link: 'https://github.com/epicmaxco/vuestic-ui/pull/1865',
        },
        {
          title: 'Component Presets',
          type: 'service',
          link: 'https://github.com/epicmaxco/vuestic-ui/issues/1806',
        },
        {
          title: 'CSS Helpers',
          type: 'service',
          link: 'https://github.com/epicmaxco/vuestic-ui/pull/1890',
        },
        {
          title: 'TreeView',
          type: 'component',
          link: 'https://github.com/epicmaxco/vuestic-ui/pull/1728',
        },
        {
          title: 'SplitPanel',
          type: 'component',
          link: 'https://github.com/epicmaxco/vuestic-ui/pull/2068',
        },
        {
          title: 'Button',
          type: 'redesign',
          link: 'https://github.com/epicmaxco/vuestic-ui/pull/1945',
        },
      ],
    } as {
      roadmap: RoadmapItem[]
    },
  }),

  block.subtitle('roadmap.released.title'),

  block.headline('roadmap.1-4.title'),
  block.paragraph('roadmap.1-4.description'),

  block.headline('roadmap.1-3.title'),
  block.paragraph('roadmap.1-3.description'),

  block.headline('roadmap.1-2.title'),
  block.paragraph('roadmap.1-2.description'),

  block.headline('roadmap.1-1.title'),
  block.paragraph('roadmap.1-1.description'),

  block.headline('roadmap.1-0.title'),
  block.paragraph('roadmap.1-0.description'),

  block.headline('roadmap.0-1.title'),
  block.paragraph('roadmap.0-1.description'),
]

export default config

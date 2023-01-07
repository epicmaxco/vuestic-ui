import { FilterPattern } from '@rollup/pluginutils'
import { PageConfigBlockFabric, PageConfigBlockCompiled } from './compiler/blocks'

export type DefinePageConfigOptions = {
  include: FilterPattern,
  exclude: FilterPattern
}

export type PageBlock = any

export type PageConfigOptions = {
  meta: {
    title: string;
    // TODO: Add more
    category: 'component' | 'introduction' | 'services'
    badge?: string
    visibility?: boolean
  },

  blocks: PageConfigBlockCompiled[]
}

export type CompiledPageConfig = PageConfigOptions & { path: string }

// declare global {
//   function definePageConfig(options: PageConfigOptions): CompiledPageConfig

//   const block: PageConfigBlockFabric
// }

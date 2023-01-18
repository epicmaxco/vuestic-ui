import { DefineComponent } from 'vue'
import example from '../blocks/example'
import title from '../blocks/title'
import paragraph from '../blocks/paragraph'
import subtitle from '../blocks/subtitle'
import file from '../blocks/file'
import code from '../blocks/code'
import markdown from '../blocks/markdown'
import api from '../blocks/api'
import collapse from '../blocks/collapse'
import alert from '../blocks/alert'
import component from '../blocks/component'

// Need to define type in collapse without recursion
const blocksWithoutCollapse = {
  alert,
  example,
  title,
  paragraph,
  subtitle,
  file,
  code,
  markdown,
  api,
  component,
}

export type BlockWithCollapse = ReturnType<(typeof blocksWithoutCollapse)[keyof typeof blocksWithoutCollapse]>

export const block = {
  ...blocksWithoutCollapse,
  collapse,
}

export type GlobalBlock = typeof block
export type Block = ReturnType<GlobalBlock[keyof typeof block]>

export type PageConfigOptions = {
  meta: {
    title: string;
    // TODO: Add more
    category: 'component' | 'introduction' | 'services' | 'getting-started'
    badge?: string
    visibility?: boolean
  },

  blocks: Block[]
}

export const definePageConfig = (options: PageConfigOptions) => options

export type DefinePageConfig = typeof definePageConfig

export type UnwrapPageConfigBlock<T extends Record<string, any>> = {
  _blockComponent: DefineComponent,
} & T

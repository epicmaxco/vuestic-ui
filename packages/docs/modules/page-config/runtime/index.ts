import { DefineComponent } from 'vue'
import { MetaObject } from '#head';
import example from '../blocks/example'
import title from '../blocks/title'
import paragraph from '../blocks/paragraph'
import subtitle from '../blocks/subtitle'
import file from '../blocks/file'
import fileStructure from '../blocks/file-structure'
import code from '../blocks/code'
import markdown from '../blocks/markdown'
import api from '../blocks/api'
import collapse from '../blocks/collapse'
import async from '../blocks/async'
import alert from '../blocks/alert'
import component from '../blocks/component'
import headline from '../blocks/headline'
import link from '../blocks/link'
import list from '../blocks/list'
import table from '../blocks/table'
import cards from '../blocks/cards'
import changeLog from '../blocks/change-log';
import { APIDescriptionOptions, type ManualApiOptions } from '../blocks/api/types'

// Need to define type in collapse without recursion
const blocksWithoutCollapse = {
  alert,
  example,
  title,
  paragraph,
  subtitle,
  file,
  fileStructure,
  code,
  markdown,
  api,
  component,
  headline,
  link,
  list,
  table,
  cards,
  changeLog,
}

export type BaseBlock = ReturnType<(typeof blocksWithoutCollapse)[keyof typeof blocksWithoutCollapse]>

export const block = {
  ...blocksWithoutCollapse,
  collapse,
  async,
}

export type GlobalBlock = typeof block
export type Block = ReturnType<GlobalBlock[keyof typeof block]>

export type ConcreteBlock<T extends string, B = Block> = B extends { type: T } ? B : never

export type PageConfigOptions = {
  head?: MetaObject,

  meta?: {
    title?: string;
    // TODO: Add more
    category?: 'component' | 'introduction' | 'services' | 'getting-started'
    badge?: string
    visibility?: boolean
  },

  blocks: Block[],
}

export const defineManualApi = (options: ManualApiOptions) => options
export type DefineManualApi = typeof defineManualApi

export const definePageConfig = (options: PageConfigOptions) => options

export type DefinePageConfig = typeof definePageConfig

export type UnwrapPageConfigBlock<T extends Record<string, any>> = {
  _blockComponent: DefineComponent,
} & T

export const defineApiDescription = (options: APIDescriptionOptions) => options;

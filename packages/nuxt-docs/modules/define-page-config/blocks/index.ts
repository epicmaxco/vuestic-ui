import type { PageConfigComponent } from './component'
import type { PageConfigExample } from './example'

export type PageConfigBlockFabric = {
  component: PageConfigComponent
  example: PageConfigExample
}

export type PageConfigBlock = PageConfigBlockFabric[keyof PageConfigBlockFabric]
export type PageConfigBlockCompiled = ReturnType<PageConfigBlockFabric[keyof PageConfigBlockFabric]>
export type PageConfigBlockType = PageConfigBlockCompiled['type']

export * from './component'
export * from './example'

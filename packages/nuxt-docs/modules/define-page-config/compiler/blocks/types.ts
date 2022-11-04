import type { PageConfigComponent } from './component'
import type { PageConfigExample } from './example'

export type PageConfigBlock = PageConfigBlockFabric[keyof PageConfigBlockFabric]
export type PageConfigBlockCompiled = ReturnType<PageConfigBlockFabric[keyof PageConfigBlockFabric]>
export type PageConfigBlockType = PageConfigBlockCompiled['type']

export type PageConfigBlockFabric = {
  component: PageConfigComponent
  example: PageConfigExample
}
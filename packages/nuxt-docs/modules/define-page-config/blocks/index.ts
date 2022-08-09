import type { PageConfigComponent } from './component'
import type { PageConfigExample } from './example'

export type PageConfigBlockFabric = {
  component: PageConfigComponent
  example: PageConfigExample
  // code: (name: string) => {
  //   type: 'code'
  //   source: string
  // }
}

export type PageConfigBlock = PageConfigBlockFabric[keyof PageConfigBlockFabric]
export type PageConfigBlockCompiled = ReturnType<PageConfigBlockFabric[keyof PageConfigBlockFabric]>
export type PageConfigBlockType = PageConfigBlockCompiled['type']

export * from './component'
export * from './example'

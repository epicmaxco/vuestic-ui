import type { blockCompilers } from './index'
import type { CompileBlockFn } from './defineCompileBlockFn'

export type PageConfigBlock = PageConfigBlockFabric[keyof PageConfigBlockFabric]
export type PageConfigBlockCompiled = ReturnType<PageConfigBlockFabric[keyof PageConfigBlockFabric]>
export type PageConfigBlockType = PageConfigBlockCompiled['type']

export type ExtractConfig<T> = T extends CompileBlockFn<infer R> ? R : never

export type PageConfigBlockFabric = {
  [K in keyof typeof blockCompilers]: ExtractConfig<typeof blockCompilers[K]>
}


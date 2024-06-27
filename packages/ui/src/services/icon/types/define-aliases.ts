import { IconConfiguration } from '../types'

export const defineIconAliases = <Name extends string>(aliases: IconConfiguration<Name>[]) => aliases

export type ExtractIconAliasesName<T> = T extends IconConfiguration<infer Name>
  ? Name
  : T extends IconConfiguration<infer Name>[] ?
    Name
    : never

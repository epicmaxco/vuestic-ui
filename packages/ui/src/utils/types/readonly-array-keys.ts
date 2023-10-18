export type ExtractReadonlyArrayKeys<T extends readonly any[]> = (T) extends readonly (infer P)[] ? P : never

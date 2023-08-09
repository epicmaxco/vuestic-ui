export const BUILD_TYPES = ['es', 'cjs', 'iife', 'esm-node', 'web-components', 'types', 'nuxt', 'styles', 'meta'] as const

type ExtractArrayValues<T> = T extends readonly [...(infer Key)[]] ? Key : never
export type BuildTarget = ExtractArrayValues<typeof BUILD_TYPES>

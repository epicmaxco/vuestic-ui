import type { Prop, PropType } from 'vue'

export type Pretty<T> = true extends boolean ? T : never

export type PropOptions<T, D = T, P = Prop<T, D>> = P extends PropType<T> ? never : P

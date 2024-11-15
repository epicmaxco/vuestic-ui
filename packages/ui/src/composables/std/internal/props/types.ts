import type { Prop, PropType } from 'vue'

// Private from vue
type DefaultFactory<T> = (props: any) => T | null | undefined;

export interface PropAsOptions<T = any, D = T> {
  type?: PropType<T> | true | null;
  required?: boolean;
  default?: D | DefaultFactory<D> | null | undefined | object;
  validator?(value: unknown, props: any): boolean;
}

export type Pretty<T> = true extends boolean ? T : never

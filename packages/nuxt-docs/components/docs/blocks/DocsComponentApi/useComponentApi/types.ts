import { 
  ComponentOptionsWithArrayProps,
  ComponentOptionsWithObjectProps,
  ComponentOptionsWithoutProps
} from "vue"

export type ComponentOptionsWithProps = ComponentOptionsWithArrayProps | ComponentOptionsWithObjectProps | ComponentOptionsWithoutProps

export type ObjectProp<T = any> = {
  type: T[],
  default: T,
  required: boolean
}

import { DefineEmits, DefineProps, DefinePropsDefault } from '../utils/types/composable-props'

export type StatefulProps<ModelValue = any> = DefineProps<{
  stateful?: boolean
  modelValue?: ModelValue
}>

export type StatefulEmits<ModelValue = any> = DefineEmits<{
  'update:modelValue': [ModelValue]
}>

export const statefulPropsDefaults = {
  stateful: false,
} satisfies DefinePropsDefault<StatefulProps>

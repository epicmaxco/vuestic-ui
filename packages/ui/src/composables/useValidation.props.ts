import { DefineEmits, DefineProps, DefinePropsDefault } from './../utils/types/composable-props'

export type ValidationRule<V = any> = ((v: V) => any | string) | Promise<((v: V) => any | string)>

export type ValidationProps<ModelValue = any> = DefineProps<{
  name?: string
  rules?: ValidationRule<ModelValue>[]
  dirty?: boolean
  error?: boolean
  errorMessages?: string | string[]
  errorCount?: number | string
  success?: boolean
  messages?: string | string[]
  immediateValidation?: boolean
  modelValue?: ModelValue
}>

export type ValidationEmits = DefineEmits<{
  'update:error': [boolean]
  'update:errorMessages': [string | string[]]
  'update:dirty': [boolean]
}>

export const validationPropsDefaults = {
  rules: () => [],
  dirty: false,
  errorCount: 1,
  success: false,
  messages: () => [],
  errorMessages: () => [],
  immediateValidation: false,
} satisfies DefinePropsDefault<ValidationProps>

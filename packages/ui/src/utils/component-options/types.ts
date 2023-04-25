import type { ComponentOptionsBase, PropType, ExtractPropTypes } from 'vue'

// `type TEST<T> = true extends boolean ? T : never` returns type value instead of TEST<T>, so we can clearly see props types
// because they are hidden behind type alias

// Define component
export type DefineComponentOptions = ComponentOptionsBase<any, any, any, any, any, any, any, any>

// ExtractOptionProp taken from Vue3 source code
declare type ExtractDefineComponentOptionProp<T> = T extends ComponentOptionsBase<infer P, any, any, any, any, any, any, any> ? unknown extends P ? {} : P : {};
// Remove useless readonly and nullable key here:
// -readonly removes readonly
// -? removes undefined from key, so we can be sure that prop exists and should have type.
declare type ExtractDefineComponentPropsType<T> = true extends boolean ? {
  -readonly [K in keyof ExtractDefineComponentOptionProp<T>]-?: {
    type: PropType<ExtractDefineComponentOptionProp<T>[K]>,
    required: undefined extends ExtractDefineComponentOptionProp<T>[K] ? false : true,
    default: undefined extends ExtractDefineComponentOptionProp<T>[K] ? undefined : ExtractDefineComponentOptionProp<T>[K],
  }
} : never

export type ExtractComponentProps<T extends DefineComponentOptions> = true extends boolean ? ExtractDefineComponentPropsType<T> : never
export type ExtractComponentEmits<T> = T extends ComponentOptionsBase<any, any, any, any, any, any, any, infer E> ? E: []

type UnPropType<T> = T extends PropType<infer P> ? P : never
export type ExtractComponentPropTypes<T extends DefineComponentOptions> = {
  [K in keyof ExtractComponentProps<T>]: UnPropType<ExtractComponentProps<T>[K]['type']>
}

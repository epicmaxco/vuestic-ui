import { ComponentOptionsBase } from "vue"

type ComponentPropsOptions<C> = C extends ComponentOptionsBase<infer PP, any, any, any, any, any, any, any> ? PP : {}

type ExtractPropType<P> = P extends {
  type: infer Type
} ? Type : P

/** 
 * Returns object where object where props with default marked as optional.
 * It looks like `ExtractPropTypes` from vue package, but uses different component type. 
 */
export type ExtractPropTypes<
  C extends ComponentOptionsBase<any, any, any, any, any, any, any, any>, // DefineComponent result
  // Provide here default values so it's one parameter type and props object can be indexed
  Props extends {} = ComponentPropsOptions<C>,
  PropsWithDefaultKeys extends keyof C['__defaults'] = keyof C['__defaults'],
  PropsWithoutDefaultKeys extends Exclude<keyof Props, PropsWithDefaultKeys> = Exclude<keyof Props, PropsWithDefaultKeys>,
> = {
  -readonly[key in PropsWithoutDefaultKeys]: ExtractPropType<Props[key]> 
} & {
  -readonly[key in PropsWithDefaultKeys]?: ExtractPropType<Props[key]>
}

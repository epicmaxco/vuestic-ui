import {
  ComponentPropsOptions,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  EmitsOptions,
  ComponentInjectOptions,
  ComponentOptionsWithObjectProps,
  DefineComponent,
} from 'vue'

type SlotDeclaration = any
type ExtractNew<T> = T extends { new(): infer R } ? R : never
type CreateComponentConstructor<Instance> = {
  new(): Instance
}
type WithTemplateSlots<S extends Record<string, SlotDeclaration>, Component> = CreateComponentConstructor<
  ExtractNew<Component> & {
  $slots: {
    [K in keyof S]: (props: S[K]) => any
  };
}> & Component

export function defineComponent<
  Slots extends Record<string, SlotDeclaration>,
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = any,
  M extends MethodOptions = any,
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = any,
  EE extends string = string,
  I extends ComponentInjectOptions = any,
  II extends string = string
> (
  options: ComponentOptionsWithObjectProps<
    PropsOptions,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE,
    I,
    II
  > & { slots?: Slots },
): WithTemplateSlots<Slots, DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>> {
  return options as any
}

export const defineSlots = <S extends Record<string, SlotDeclaration>>() => {
  return <T>(o: T) => o as CreateComponentConstructor<
    ExtractNew<T> &
    {
      $slots: {
        [K in keyof S]: (props: S[K]) => any
      };
    }
  > & T
}

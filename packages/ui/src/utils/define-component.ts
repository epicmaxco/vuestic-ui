import {
  ComponentPropsOptions,
  ComputedOptions,
  MethodOptions,
  ComponentOptionsMixin,
  EmitsOptions,
  ComponentInjectOptions,
  ComponentOptionsWithObjectProps,
  DefineComponent,
  Slots,
  VNode,
} from 'vue'

type SlotDeclaration = any
type ExtractNew<T> = T extends { new(): infer R } ? R : never
type WithTemplateSlots<S extends Record<string, SlotDeclaration>, Instance> = {
  new(): ExtractNew<Instance> & {
    $slots: {
      [K in keyof S]: (props: S[K]) => any
    };
  }
};

type D = WithTemplateSlots<{ P: 2[] }, {
  new(): {
    Test: 1
  }
}>

type K = D extends { new(): infer R } ? R : never

export function defineComponent<
  Slots extends Record<string, SlotDeclaration>,
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = {},
  EE extends string = string,
  I extends ComponentInjectOptions = {},
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
  > & { slots: Slots },
): WithTemplateSlots<Slots, DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>> {
  return options as any
}

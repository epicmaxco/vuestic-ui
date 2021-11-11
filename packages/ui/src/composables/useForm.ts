import { computed, PropType } from 'vue'

export interface UseFormProps {
  disabled: boolean;
  readonly: boolean;
  id?: string | number;
  name?: string | number;
}

export const useFormProps = {
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
}

export const useFormPropsWithId = {
  ...useFormProps,
  id: { type: [String, Number] as PropType<string | number>, default: undefined },
  name: { type: [String, Number] as PropType<string | number>, default: undefined },
}

export const useForm = (props: UseFormProps) => {
  /**
   * Create readonly and disabled BEM modificators.
   * @returns Object with classes which starts with `prefix` and ends with form state BEM modificator.
   */
  const createComputedClass = <Prefix extends string>(prefix: Prefix) => computed(() => ({
    [`${prefix}--disabled`]: props.disabled,
    [`${prefix}--readonly`]: props.readonly,
  }) as Record<`${Prefix}--disabled` | `${Prefix}--readonly`, boolean>)

  /**
   * Create readonly and disabled BEM modificators.
   * @returns Object with classes which starts with `prefix` and ends with form state BEM modificator.
   */
  const createComputedClassArray = <Prefix extends string>(prefix: Prefix) => computed(() => (
    [props.disabled && `${prefix}--disabled`, props.readonly && `${prefix}--readonly`]
      .filter((c) => Boolean(c))
  ) as Array<`${Prefix}--disabled` | `${Prefix}--readonly`>)

  return {
    createComputedClass,
    createComputedClassArray,
  }
}

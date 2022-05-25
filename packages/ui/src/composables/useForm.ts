import { computed, ExtractPropTypes, PropType } from 'vue'

export const useFormProps = {
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
}

export const useFormPropsWithId = {
  ...useFormProps,
  id: { type: [String, Number] as PropType<string | number>, default: undefined },
  name: { type: [String, Number] as PropType<string | number>, default: undefined },
}

/**
 * Create `readonly` and `disabled` BEM modifiers.
 * @param props component props
 * @param prefix string with which classes starts (and ends with form state BEM modifier)
 */
export const useForm = <Prefix extends string>(
  props: ExtractPropTypes<typeof useFormPropsWithId>,
  prefix?: Prefix,
) => {
  /**
   * Create `readonly` and `disabled` BEM modifiers.
   * @returns Object with classes which starts with `prefix` and ends with form state BEM modifier
   */
  const createComputedClasses = (prefix: Prefix) => computed(() => ({
    [`${prefix}--disabled`]: props.disabled,
    [`${prefix}--readonly`]: props.readonly,
  }) as Record<`${Prefix}--disabled` | `${Prefix}--readonly`, boolean>)

  const computedClassesWithoutPrefix = createComputedClasses(prefix || '' as Prefix)

  /**
   * Computed Object with classes which starts with `prefix` and ends with form state BEM modifier
   */
  const computedClasses = computed(() => {
    if (!prefix) {
      console.warn('You must pass the @param "prefix" to the useForm hook!')
    }

    return computedClassesWithoutPrefix.value
  })

  /**
   * Create `readonly` and `disabled` BEM modifiers.
   * @returns Array with classes which starts with `prefix` and ends with form state BEM modifier.
   */
  const createComputedClassesArray = (prefix: Prefix) => computed(() => (
    [props.disabled && `${prefix}--disabled`, props.readonly && `${prefix}--readonly`]
      .filter((c) => Boolean(c))
  ) as Array<`${Prefix}--disabled` | `${Prefix}--readonly`>)

  const computedClassesArrayWithoutPrefix = createComputedClassesArray(prefix || '' as Prefix)

  /**
   * Computed Array with classes which starts with `prefix` and ends with form state BEM modifier
   */
  const computedClassesArray = computed(() => {
    if (!prefix) {
      console.warn('You must pass the @param "prefix" to the useForm hook!')
    }

    return computedClassesArrayWithoutPrefix.value
  })

  return {
    createComputedClasses,
    computedClasses,
    createComputedClassesArray,
    computedClassesArray,
  }
}

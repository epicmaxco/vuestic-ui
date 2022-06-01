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
  props: ExtractPropTypes<typeof useFormProps>,
  prefix?: Prefix,
) => {
  const computedClassesWithoutWarning = computed(() => ({
    [`${prefix || ''}--disabled`]: props.disabled,
    [`${prefix || ''}--readonly`]: props.readonly,
  }) as Record<`${Prefix}--disabled` | `${Prefix}--readonly`, boolean>)

  /**
   * Computed Object with classes which starts with `prefix` and ends with form state BEM modifier
   */
  const computedClasses = computed(() => {
    if (!prefix) {
      console.warn('You must pass the @param "prefix" to the useForm hook!')
    }

    return computedClassesWithoutWarning.value
  })

  const computedClassesArrayWithoutWarning = computed(() => [
    props.disabled && `${prefix || ''}--disabled`,
    props.readonly && `${prefix || ''}--readonly`,
  ].filter(Boolean) as Array<`${Prefix}--disabled` | `${Prefix}--readonly`>)

  /**
   * Computed Array with classes which starts with `prefix` and ends with form state BEM modifier
   */
  const computedClassesArray = computed(() => {
    if (!prefix) {
      console.warn('You must pass the @param "prefix" to the useForm hook!')
    }

    return computedClassesArrayWithoutWarning.value
  })

  return {
    computedClasses,
    computedClassesArray,
  }
}

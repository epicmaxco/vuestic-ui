import { computed, ExtractPropTypes, PropType } from 'vue'
import { useBem } from './useBem'
import pick from 'lodash/pick.js'

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
 * @returns computed Object/Array with classes which starts with `prefix` and ends with form state BEM modifier
 */
export const useForm = <Prefix extends string>(
  props: ExtractPropTypes<typeof useFormProps>,
  prefix?: Prefix,
) => {
  const {
    computedBemClassesObject: computedClasses,
    computedBemClassesArray: computedClassesArray,
  } = useBem(
    prefix, computed(() => pick(props, ['disabled', 'readonly'])),
  )

  return { computedClasses, computedClassesArray }
}

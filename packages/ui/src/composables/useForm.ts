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
 * @description creates `readonly` and `disabled` BEM modifiers.
 * @param prefix string that classes start with (base BEM class).
 * @param props component props.
 * @returns computed classes object starting with `prefix` and ending with form state BEM modifier.
 */
export const useForm = <Prefix extends string = ''>(
  prefix: Prefix,
  props: ExtractPropTypes<typeof useFormProps>,
) => {
  const computedClasses = useBem<'disabled' | 'readonly', Prefix>(prefix, computed(() => pick(props, ['disabled', 'readonly'])))
  return { computedClasses }
}

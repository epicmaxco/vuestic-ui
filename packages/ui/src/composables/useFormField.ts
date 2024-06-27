import { computed, ExtractPropTypes } from 'vue'

import { useBem } from './useBem'
import { pick } from '../utils/pick'

export const useFormFieldProps = {
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
}

export const useFormFieldPropsWithId = {
  ...useFormFieldProps,
  id: { type: [String, Number], default: undefined },
  name: { type: [String, Number], default: undefined },
}

/**
 * @description creates `readonly` and `disabled` BEM modifiers.
 * @param prefix string that classes start with (base BEM class).
 * @param props component props.
 * @returns computed classes object starting with `prefix` and ending with form state BEM modifier.
 */
export const useFormField = <Prefix extends string = ''>(
  prefix: Prefix,
  props: ExtractPropTypes<typeof useFormFieldProps>,
) => {
  const computedClasses = useBem<'disabled' | 'readonly', Prefix>(prefix, computed(() => pick(props, ['disabled', 'readonly'])))
  return { computedClasses }
}

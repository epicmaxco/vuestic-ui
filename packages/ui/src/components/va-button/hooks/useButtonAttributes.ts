import { computed, ComputedRef } from 'vue'
import { ButtonPropsTypes } from '../types'
import { useRouterLink } from '../../../composables'

type UseButtonAttributes = (
  props: ButtonPropsTypes,
) => ComputedRef<{
  'aria-disabled': boolean,
  disabled: boolean,
  type?: any,
  tabindex?: number,
  target?: string,
  href?: any,
  to?: string | Record<string, any>,
  replace?: boolean,
  append?: boolean,
  activeClass?: string,
  exact?: boolean,
  exactActiveClass?: string,
}>

export const useButtonAttributes: UseButtonAttributes = (props) => {
  const { linkAttributesComputed, isLinkTag } = useRouterLink(props as Required<typeof props>)

  const typeComputed = computed(() => isLinkTag.value ? undefined : props.type)
  const buttonAttributesComputed = computed(() => {
    const disabledAttributes = {
      'aria-disabled': !!props.disabled,
      disabled: !!props.disabled,
    }

    if (isLinkTag.value) { return disabledAttributes }

    return {
      type: typeComputed.value,
      tabindex: props.loading || props.disabled ? -1 : 0,
      ...disabledAttributes,
    }
  })

  return computed(() => ({ ...linkAttributesComputed.value, ...buttonAttributesComputed.value }))
}

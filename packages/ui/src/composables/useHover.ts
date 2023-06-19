import { ref, Ref, watch, onMounted } from 'vue'

import { useHTMLElement, useEvent } from './'

export function useHover (el?: Ref<HTMLElement | null | undefined>, disabled?: Ref<boolean>) {
  const isHovered = ref(false)

  const onMouseEnter = () => { isHovered.value = true }
  const onMouseLeave = () => { isHovered.value = false }

  disabled && watch(disabled, (v) => {
    if (v) { isHovered.value = false }
  })

  const target = useHTMLElement(el as Ref<HTMLElement>)

  useEvent('mouseenter', onMouseEnter, target)
  useEvent('mouseleave', onMouseLeave, target)

  return { isHovered, onMouseEnter, onMouseLeave }
}

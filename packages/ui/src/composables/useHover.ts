import { ref, Ref, watch } from 'vue'

import { useEvent, useElementTemplateRef } from './'

export function useHover (el?: Ref<HTMLElement | null | undefined>, disabled?: Ref<boolean>) {
  const isHovered = ref(false)

  const onMouseEnter = () => {
    if (disabled?.value) { return }
    isHovered.value = true
  }
  const onMouseLeave = () => { isHovered.value = false }

  disabled && watch(disabled, (v) => {
    if (v) { isHovered.value = false }
  })

  const target = useElementTemplateRef(el ?? ref())

  useEvent('mouseenter', onMouseEnter, target)
  useEvent('mouseleave', onMouseLeave, target)

  return { isHovered, onMouseEnter, onMouseLeave }
}

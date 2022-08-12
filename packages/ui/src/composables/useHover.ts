import { ref, Ref, onMounted } from 'vue'

import { useHTMLElement, useEvent } from './'

export function useHover (el?: Ref<HTMLElement | null | undefined>) {
  const isHovered = ref(false)

  const onMouseEnter = () => { isHovered.value = true }
  const onMouseLeave = () => { isHovered.value = false }

  onMounted(() => {
    if (!el?.value) { return }
    const getTarget = useHTMLElement(el as Ref<HTMLElement>)
    useEvent('mouseenter', onMouseEnter, getTarget)
    useEvent('mouseleave', onMouseLeave, getTarget)
  })

  return { isHovered, onMouseEnter, onMouseLeave }
}

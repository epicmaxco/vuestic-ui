import { ref, onMounted, onBeforeUnmount, Ref } from 'vue'

export function useHover (el?: Ref<HTMLElement | null | undefined>) {
  const isHovered = ref(false)

  const onMouseEnter = () => { isHovered.value = true }
  const onMouseLeave = () => { isHovered.value = false }

  if (el) {
    onMounted(() => {
      el.value?.addEventListener('mouseenter', onMouseEnter)
      el.value?.addEventListener('mouseleave', onMouseLeave)
    })
    onBeforeUnmount(() => {
      el.value?.removeEventListener('mouseover', onMouseEnter)
      el.value?.removeEventListener('mouseleave', onMouseLeave)
    })
  }

  return {
    isHovered,
    onMouseEnter,
    onMouseLeave,
  }
}

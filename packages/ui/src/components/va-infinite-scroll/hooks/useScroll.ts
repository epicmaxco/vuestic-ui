import { Ref, onMounted, onBeforeUnmount } from 'vue'

interface ScrollTargetProps {
  scrollTarget: Element | string;
  disabled: boolean;
  reverse: boolean;
}

export const useScroll = (
  props: ScrollTargetProps,
  element: Ref<HTMLElement | undefined>,
  handler: Ref<any>,
) => {
  const addListener = () => {
    element.value?.addEventListener(
      'scroll',
      handler.value,
      { passive: true },
    )
  }

  const removeListener = () => {
    element.value?.removeEventListener(
      'scroll',
      handler.value,
    )
  }

  onMounted(() => {
    if (!element.value) { return }

    element.value.style.overflowY = 'scroll'

    if (props.reverse) {
      element.value.scrollTop = element.value.scrollHeight
    }

    addListener()
  })

  onBeforeUnmount(() => {
    if (props.disabled) { return }

    removeListener()
  })

  return {
    addListener,
    removeListener,
  }
}

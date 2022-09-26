import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue'

function getTargetElement (target: HTMLElement | string | undefined) {
  if (!target) { throw new Error('No target was provided for `useScroll` hook!') }
  return typeof target === 'string' ? document.querySelector(target) as HTMLElement : target
}

export function setupScroll (fixed?: boolean, target?: HTMLElement | string) {
  const scrollRoot = shallowRef<HTMLElement>()
  let targetElement: HTMLElement | Window | undefined

  const isScrolledDown = ref(false)
  const prevScrollPosition = ref(0)

  const onScroll = (e: Event) => {
    const target = e.target as HTMLElement | Window
    // @ts-ignore
    const scrollValue = e.target instanceof Window ? target.scrollY : target.scrollTop

    isScrolledDown.value = prevScrollPosition.value < scrollValue
    prevScrollPosition.value = scrollValue
  }

  onMounted(() => {
    targetElement = fixed ? window : getTargetElement(target || scrollRoot.value)
    targetElement?.addEventListener('scroll', onScroll, fixed)
  })

  onBeforeUnmount(() => {
    targetElement?.removeEventListener('scroll', onScroll)
  })

  return { scrollRoot, isScrolledDown }
}

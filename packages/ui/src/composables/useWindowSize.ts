import { reactive, computed, watch } from 'vue'

import { useEvent } from './'
import { isClient } from '../utils/ssr-utils'

type WindowSizes = Record<'width' | 'height', number | undefined>

export function useWindowSize () {
  const windowSizes = reactive<WindowSizes>({
    width: undefined,
    height: undefined,
  })

  const setCurrentWindowSizes = () => {
    windowSizes.width = window?.innerWidth
    windowSizes.height = window?.innerHeight
  }

  const isMounted = computed(isClient)
  watch(isMounted, (newValue) => {
    if (!newValue) { return }
    setCurrentWindowSizes()
  }, { immediate: true })
  useEvent('resize', setCurrentWindowSizes, true)

  return { windowSizes }
}

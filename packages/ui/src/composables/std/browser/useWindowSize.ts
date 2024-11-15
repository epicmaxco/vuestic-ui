import { reactive, computed, watch } from 'vue'

import { useEvent } from '../event/useEvent'
import { useIsMounted } from '../internal/useIsMounted'
import { makeSharedComposable } from '../internal/makeSharedComposable'
import { isClient } from '../../../utils/ssr'

type WindowSizes = Record<'width' | 'height', number | undefined>

export const useWindowSize = makeSharedComposable(() => {
  const windowSizes = reactive<WindowSizes>({
    width: undefined,
    height: undefined,
  })

  const setCurrentWindowSizes = () => {
    windowSizes.width = window?.innerWidth
    windowSizes.height = window?.innerHeight
  }

  if (isClient()) {
    setCurrentWindowSizes()
  }

  useEvent('resize', setCurrentWindowSizes, true)

  return { windowSizes }
})

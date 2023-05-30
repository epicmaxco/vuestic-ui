import { inject, ref, onMounted } from 'vue'

import { vaBreakpointSymbol } from '../services/breakpoint'
import { useReactiveComputed } from './useReactiveComputed'
import { useGlobalConfig } from './useGlobalConfig'

import type { BreakpointServiceObject, BreakpointHelpersKeys, BreakpointHelpers } from '../services/breakpoint'

const helpersKeys: BreakpointHelpersKeys[] = ['xs', 'sm', 'md', 'lg', 'xl', 'smUp', 'mdUp', 'lgUp', 'smDown', 'mdDown', 'lgDown']
const defaultHelpers = helpersKeys.reduce((acc, key) => {
  acc[key] = false
  return acc
}, {} as BreakpointHelpers)

export const useBreakpoint = (): BreakpointServiceObject => {
  const injected = inject(vaBreakpointSymbol, {}) as BreakpointServiceObject

  const globalConfig = useGlobalConfig().globalConfig.value.breakpoint

  const defaultBreakpoint = globalConfig.enabled
    ? {
      width: undefined,
      height: undefined,
      current: undefined,
      thresholds: globalConfig.thresholds,
      ...defaultHelpers,
    }
    : {} as BreakpointServiceObject

  const isMounted = ref(false)
  onMounted(() => { isMounted.value = true })

  return useReactiveComputed(() => isMounted.value ? injected : defaultBreakpoint)
}

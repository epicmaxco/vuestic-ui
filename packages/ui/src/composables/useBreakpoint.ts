import { inject, computed, ComputedRef } from 'vue'

import { warn } from '../utils/console'
import { vaBreakpointSymbol } from '../services/breakpoint'
import { useReactiveComputed } from './useReactiveComputed'
import { useGlobalConfig } from './useGlobalConfig'
import { useIsMounted } from './std'

import type {
  BreakpointServiceObject,
  BreakpointHelpersKeys,
  BreakpointHelpers,
  BreakpointConfig,
} from '../services/breakpoint'

const helpersKeys: BreakpointHelpersKeys[] = ['xs', 'sm', 'md', 'lg', 'xl', 'smUp', 'mdUp', 'lgUp', 'smDown', 'mdDown', 'lgDown']
const defaultHelpers = helpersKeys.reduce((acc, key) => {
  acc[key] = false
  return acc
}, {} as BreakpointHelpers)

export const useBreakpoint = (): BreakpointServiceObject => {
  const injected = inject(vaBreakpointSymbol, {}) as BreakpointServiceObject

  const isMounted = useIsMounted()

  const { globalConfig } = useGlobalConfig()

  const breakpointConfig: ComputedRef<BreakpointConfig> = computed(() => {
    const breakpoint = globalConfig.value.breakpoint
    if (!breakpoint) { warn('useBreakpoint: breakpointConfig is not defined!') }
    return breakpoint ?? {} as BreakpointConfig
  })

  const defaultBreakpoint = computed(() => breakpointConfig.value.enabled
    ? {
      width: undefined,
      height: undefined,
      current: undefined,
      thresholds: breakpointConfig.value.thresholds,
      ...defaultHelpers,
    }
    : {} as BreakpointServiceObject)

  return useReactiveComputed(() => isMounted.value ? injected : defaultBreakpoint.value)
}

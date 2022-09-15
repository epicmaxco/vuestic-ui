import { inject } from 'vue'

import { vaBreakpointSymbol } from '../services/breakpoint'

import type { BreakpointServiceObject } from '../services/breakpoint'

export const useBreakpoint = () => {
  return inject(vaBreakpointSymbol, {}) as BreakpointServiceObject
}

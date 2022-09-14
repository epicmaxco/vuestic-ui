import { inject } from 'vue'

import { vaBreakpointsSymbol } from '../services/breakpoints'

export const useBreakpoints = () => {
  return inject(vaBreakpointsSymbol)
}

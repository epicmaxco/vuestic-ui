import { inject } from 'vue'

export const useBreakpoints = () => {
  return inject('$vaBreakpoints')
}

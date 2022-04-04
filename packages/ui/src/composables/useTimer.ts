import { ref } from 'vue'

export const useTimer = () => {
  let timer: ReturnType<typeof setTimeout> | undefined

  const start = (...args: Parameters<typeof setTimeout>) => {
    timer = setTimeout(...args)

    return timer
  }

  const clear = () => timer && clearTimeout(timer)

  return {
    start,
    clear,
  }
}

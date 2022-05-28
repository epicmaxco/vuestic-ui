import { onBeforeUnmount, onMounted } from 'vue'

type Handler = (() => void)

const DELAY_MS = 100
const NO_INTERVAL = -1

export const useInterval = (cb: Handler) => {
  let interval = NO_INTERVAL

  onMounted(() => {
    interval = setInterval(cb, DELAY_MS) as any as number
  })

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
}

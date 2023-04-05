import { ref, onMounted, onUnmounted, Ref } from 'vue'

interface LongPressOptions {
  onStart: () => void;
  onEnd: () => void;
  onUpdate: () => void;
  delay?: number;
  interval?: number;
}

export function useLongPress (el: Ref<HTMLElement | null>, options: Partial<LongPressOptions>) {
  let timeoutId = -1
  let intervalId = -1

  const handleMouseDown = () => {
    options.onStart?.()
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => options.onUpdate?.(), options.interval || 100) as any
    }, options.delay || 500) as unknown as number
  }

  const handleMouseUp = () => {
    clearTimeout(timeoutId)
    clearInterval(intervalId)
    options.onEnd?.()
  }

  onMounted(() => {
    if (el.value) {
      el.value.addEventListener('mousedown', handleMouseDown)
      el.value.addEventListener('mouseup', handleMouseUp)
    }
  })

  onUnmounted(() => {
    if (el.value) {
      el.value.removeEventListener('mousedown', handleMouseDown)
      el.value.removeEventListener('mouseup', handleMouseUp)
    }
  })
}

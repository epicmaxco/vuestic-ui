import { ref, onMounted, onUnmounted, Ref } from 'vue'

interface LongPressOptions {
  onStart: () => void;
  onEnd: () => void;
  onUpdate: () => void;
  delay?: number;
  interval?: number;
}

export function useLongPress (el: Ref<HTMLElement | null>, options: LongPressOptions) {
  const timeoutId = ref<number | null>(null)
  const intervalId = ref<number | null>(null)

  const handleMouseDown = () => {
    options.onStart()
    timeoutId.value = setTimeout(() => {
      intervalId.value = setInterval(options.onUpdate, options.interval || 100) as any
    }, options.delay || 500) as any
  }

  const handleMouseUp = () => {
    clearTimeout(timeoutId.value as any)
    clearInterval(intervalId.value as any)
    options.onEnd()
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

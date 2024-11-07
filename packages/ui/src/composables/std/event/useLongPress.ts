import { Ref, ShallowRef, unref } from 'vue'
import { useEvent } from './useEvent'

type MaybeRef<T> = Ref<T> | T

interface LongPressOptions {
  onStart: (e: Event) => void;
  onEnd: (e: Event) => void;
  onUpdate: (e: Event) => void;
  delay?: MaybeRef<number>;
  interval?: number;
}

export function useLongPress (el: ShallowRef<HTMLElement | undefined>, options: Partial<LongPressOptions>) {
  let timeoutId = -1
  let intervalId = -1

  const handleMouseDown = (e: Event) => {
    options.onStart?.(e)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => options.onUpdate?.(e), options.interval || 100) as any
    }, unref(options.delay) || 500) as unknown as number
  }

  const handleMouseUp = (e: Event) => {
    clearTimeout(timeoutId)
    clearInterval(intervalId)
    options.onEnd?.(e)
  }

  useEvent(['mousedown', 'touchstart', 'dragstart'], handleMouseDown, el)
  useEvent([
    'mouseup', 'mouseleave',
    'touchend', 'touchcancel',
    'drop', 'dragend',
    'blur',
  ], handleMouseUp, true)
}

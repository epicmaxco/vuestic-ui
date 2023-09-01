import { Ref, ShallowRef, unref } from 'vue'
import { useEvent } from './useEvent'
import { MaybeElement, useHTMLElement } from '.'

type MaybeRef<T> = Ref<T> | T

interface LongPressOptions {
  onStart: () => void;
  onEnd: () => void;
  onUpdate: () => void;
  delay?: MaybeRef<number>;
  interval?: number;
}

export function useLongPress (el: ShallowRef<HTMLElement | undefined>, options: Partial<LongPressOptions>) {
  let timeoutId = -1
  let intervalId = -1

  const handleMouseDown = () => {
    options.onStart?.()
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => options.onUpdate?.(), options.interval || 100) as any
    }, unref(options.delay) || 500) as unknown as number
  }

  const handleMouseUp = () => {
    clearTimeout(timeoutId)
    clearInterval(intervalId)
    options.onEnd?.()
  }

  const htmlElement = useHTMLElement(el)

  useEvent(['mousedown', 'touchstart', 'dragstart'], handleMouseDown, htmlElement)
  useEvent([
    'mouseup', 'mouseleave',
    'touchend', 'touchcancel',
    'drop', 'dragend',
    'blur',
  ], handleMouseUp, true)
}

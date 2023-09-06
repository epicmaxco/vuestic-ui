import { Ref, ShallowRef, unref } from 'vue'
import { useEvent } from './useEvent'
import { MaybeElement, useHTMLElement } from '.'

type MaybeRef<T> = Ref<T> | T

interface LongPressOptions {
  onStart: (ev: KeyboardEvent) => void;
  onEnd: (ev: KeyboardEvent) => void;
  onUpdate: (ev: KeyboardEvent | FocusEvent) => void;
  delay?: MaybeRef<number>;
  interval?: number;
}

export function useLongPressKey (el: ShallowRef<HTMLElement | undefined>, options: Partial<LongPressOptions>) {
  let timeoutId = -1
  let intervalId = -1

  const handleMouseDown = (e: KeyboardEvent) => {
    options.onStart?.(e)
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      intervalId = setInterval(() => options.onUpdate?.(e), options.interval || 100) as any
    }, unref(options.delay) || 500) as unknown as number
  }

  const handleMouseUp = (e: KeyboardEvent) => {
    clearTimeout(timeoutId)
    clearInterval(intervalId)
    options.onEnd?.(e)
  }

  const htmlElement = useHTMLElement(el)

  useEvent(['keydown'], handleMouseDown, htmlElement)
  useEvent([
    'keyup', 'blur',
  ], handleMouseUp, true)
}

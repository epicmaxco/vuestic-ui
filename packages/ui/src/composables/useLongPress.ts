import { ShallowRef } from 'vue'
import { useEvent } from './useEvent'
import { useHTMLElement } from '.'

interface LongPressOptions {
  onStart: () => void;
  onEnd: () => void;
  onUpdate: () => void;
  delay?: number;
  interval?: number;
}

export function useLongPress (el: ShallowRef<HTMLElement | undefined>, options: Partial<LongPressOptions>) {
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

  const htmlElement = useHTMLElement(el)

  useEvent('mousedown', handleMouseDown, htmlElement)
  useEvent('mouseup', handleMouseUp, htmlElement)
}

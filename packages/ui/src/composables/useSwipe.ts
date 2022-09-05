import { ref, reactive, watchEffect, ShallowRef, ExtractPropTypes } from 'vue'

import { useEvent } from './'

export type SwipeDirection = 'up' | 'down' | 'left' | 'right' | ''
type SwipeCoordinates = { x: number, y: number }
type SwipePath = { start: SwipeCoordinates, end: SwipeCoordinates }

const mouseEvents = ['mousedown', 'mousemove']
const touchEvents = ['touchstart', 'touchmove']

export const useSwipeProps = {
  swipable: { type: Boolean, default: true },
  swipeDistance: { type: Number, default: 10 },
}

export const useSwipe = (
  props: ExtractPropTypes<typeof useSwipeProps>,
  swipableContainer: ShallowRef<HTMLElement | undefined>,
) => {
  const swipeStarted = ref(false)
  const swipePath = reactive({
    start: reactive({ x: 0, y: 0 }),
    end: reactive({ x: 0, y: 0 }),
  }) as SwipePath

  const setPosition = (e: TouchEvent | MouseEvent, type: 'start' | 'end') => {
    let event: MouseEvent | Touch | undefined
    if (mouseEvents.includes(e.type)) { event = e as MouseEvent }
    if (touchEvents.includes(e.type)) {
      const touchEvent = e as TouchEvent
      event = touchEvent.changedTouches[touchEvent.changedTouches.length - 1]
    }
    if (!event) { return }

    swipePath[type].x = event.pageX
    swipePath[type].y = event.pageY
  }

  const onSwipeStart = (e: TouchEvent | MouseEvent) => {
    if (!props.swipable) { return }
    swipeStarted.value = true
    setPosition(e, 'start')
  }
  const onSwipeMove = (e: TouchEvent | MouseEvent) => {
    setPosition(e, 'end')
  }

  const swipeDirection = ref<SwipeDirection>('')
  // const checkDistance = ({ start, end }: SwipePath) => Math.abs(start - end) >= props.swipeDistance
  watchEffect(() => {
    // if (checkDistance(swipePath.start))
  })

  useEvent('touchstart', onSwipeStart, swipableContainer)
  useEvent('mousedown', onSwipeStart, swipableContainer)
  useEvent('touchmove', onSwipeMove, swipableContainer)
  useEvent('mousemove', onSwipeMove, swipableContainer)

  return {
    swipeDirection,
    onSwipeStart,
  }
}

import { ref, reactive, watch, PropType, ShallowRef, ExtractPropTypes, watchEffect } from 'vue'

import { useEvent } from './'

type SwipeDirection = 'up' | 'down' | 'left' | 'right' | ''
type SwipePosition = 'start' | 'end'
type SwipeCoordinates = Record<'x' | 'y', number>
type SwipePath = Record<SwipePosition, SwipeCoordinates>
export type SwipeState = { direction: SwipeDirection, duration: number }

type AllowedSwipeDirection = 'all' | 'horizontal' | 'vertical' | SwipeDirection

const mouseEvents = ['mousedown', 'mousemove']
const touchEvents = ['touchstart', 'touchmove']

const commonAllowedDirections = {
  vertical: ['', 'all', 'vertical'],
  horizontal: ['', 'all', 'horizontal'],
}
const verticalSpecificAllowedDirections = [...commonAllowedDirections.vertical, 'up', 'down']
const horizontalSpecificAllowedDirections = [...commonAllowedDirections.horizontal, 'left', 'right']

/**
 * swipable - enables swiping.
 * swipeDistance - distance in px considered sufficient for the swipe event.
 * swipeDirection - allowed and handled swipe directions.
 */
export const useSwipeProps = {
  swipable: { type: Boolean, default: false },
  swipeDistance: { type: Number, default: 75 },
  swipeDirection: { type: String as PropType<AllowedSwipeDirection>, default: 'all' },
}

/**
 * @description composable for handling swipes direction via mouse or touchpad.
 * @param props - use swipe props.
 * @param container - swipable container shallow ref.
 * @param cb - callback for every swipe event.
 * @example
 *  props: { ...useSwipeProps }
 *  const container = shallowRef<HTMLElement>()
 *  const onSwipe = () => { if(swipeState === 'left') { local component's logic } }
 *  const { swipeState } = useSwipe(props, container, onSwipe)
 */
export const useSwipe = (
  props: ExtractPropTypes<typeof useSwipeProps>,
  container: ShallowRef<HTMLElement | undefined>,
  cb: (state: SwipeState) => void,
) => {
  const swipeStarted = ref(false)
  const swipePath = reactive({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  }) as SwipePath
  const swipeDuration = reactive({
    start: 0,
    end: 0,
  })

  const setState = (e: TouchEvent | MouseEvent, type: SwipePosition) => {
    let event: MouseEvent | Touch | undefined
    if (mouseEvents.includes(e.type)) { event = e as MouseEvent }
    if (touchEvents.includes(e.type)) {
      const touchEvent = e as TouchEvent
      event = touchEvent.changedTouches[touchEvent.changedTouches.length - 1]
    }
    if (!event) { return }

    swipePath[type].x = event.pageX
    swipePath[type].y = event.pageY
    swipeDuration[type] = new Date().getTime()
  }

  const onSwipeStart = (e: TouchEvent | MouseEvent) => {
    if (!props.swipable || swipeStarted.value) { return }
    swipeStarted.value = true
    setState(e, 'start')
  }

  const onSwipeMove = (e: TouchEvent | MouseEvent) => {
    if (!swipeStarted.value) { return }
    setState(e, 'end')
  }

  const resetSwipe = () => {
    (['start', 'end'] as SwipePosition[]).forEach((type) => {
      swipePath[type].x = 0
      swipePath[type].y = 0
      swipeDuration[type] = 0
    })
    swipeStarted.value = false
  }

  const isSwipeAllowed = reactive({
    vertical: false,
    horizontal: false,
  })
  watchEffect(() => {
    isSwipeAllowed.horizontal = horizontalSpecificAllowedDirections.includes(props.swipeDirection)
    isSwipeAllowed.vertical = verticalSpecificAllowedDirections.includes(props.swipeDirection)
  })

  const calcDistance = (axis: 'x' | 'y') => {
    return isSwipeAllowed[axis === 'x' ? 'horizontal' : 'vertical'] &&
    swipePath.start[axis] && swipePath.end[axis]
      ? Math.trunc(swipePath.start[axis] - swipePath.end[axis])
      : 0
  }

  const getAcceptableValue = (direction: 'horizontal' | 'vertical', result: SwipeDirection) => {
    return result === props.swipeDirection || commonAllowedDirections[direction].includes(props.swipeDirection) ? result : ''
  }

  const swipeState = reactive({ direction: '', duration: 0 }) as SwipeState
  watch(swipePath, () => {
    const xDistance = calcDistance('x')
    const yDistance = calcDistance('y')

    if ((xDistance || yDistance) && [xDistance, yDistance].some((el) => Math.abs(el) >= props.swipeDistance)) {
      if (Math.abs(xDistance) >= Math.abs(yDistance) && isSwipeAllowed.horizontal) {
        const result = xDistance > 0 ? 'left' : 'right'
        swipeState.direction = getAcceptableValue('horizontal', result)
      } else if (Math.abs(xDistance) < Math.abs(yDistance) && isSwipeAllowed.vertical) {
        const result = yDistance > 0 ? 'down' : 'up'
        swipeState.direction = getAcceptableValue('vertical', result)
      }

      swipeState.duration = swipeDuration.end - swipeDuration.start

      resetSwipe()
    }
  }, { deep: true })

  watch(swipeState, () => cb(swipeState), { deep: true })

  if (props.swipable) {
    useEvent(['touchstart', 'mousedown'], onSwipeStart, container)
    useEvent(['touchmove', 'mousemove'], onSwipeMove, container)
    useEvent(['touchcancel', 'mouseup', 'touchend', 'mouseleave'], resetSwipe, container)
  }

  return { swipeState }
}

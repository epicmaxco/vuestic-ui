import throttle from 'lodash/throttle'
import { Vue } from 'vue-class-component'

export type State = {
  isTopAffixed: boolean;
  isBottomAffixed: boolean;
  width?: number;
}

type Coordinates = {
  top: number;
  bottom: number;
}

type ValuesToComputeAffixedState = {
  coordinates: Coordinates;
  offsetTop?: number;
  offsetBottom?: number;
  target: HTMLElement | Window | undefined;
}

export function getWindowHeight () {
  return document.documentElement.clientHeight ||
    window.innerHeight ||
    document.body.clientHeight
}

export function computeAffixedState ({
  coordinates,
  offsetTop,
  offsetBottom,
  target,
}: ValuesToComputeAffixedState): State {
  let isTopAffixed = false
  let isBottomAffixed = false

  const windowHeight = getWindowHeight()

  if (offsetTop != null && windowHeight) {
    if (target === window) {
      isTopAffixed = coordinates.top <= offsetTop
    } else {
      const { top } = (target as HTMLElement).getBoundingClientRect()
      isTopAffixed = coordinates.top - top <= offsetTop
    }
  }

  if (offsetBottom != null && windowHeight) {
    if (target === window) {
      isBottomAffixed = coordinates.bottom >= windowHeight - offsetBottom
    } else {
      const { bottom } = (target as HTMLElement).getBoundingClientRect()
      isBottomAffixed = bottom - coordinates.bottom <= offsetBottom
    }
  }

  return {
    isTopAffixed,
    isBottomAffixed,
  }
}

function checkAffixedStateChange (currentState: State, nextState: State): boolean {
  return currentState.isTopAffixed !== nextState.isTopAffixed ||
    currentState.isBottomAffixed !== nextState.isBottomAffixed
}

export type Context = {
  offsetTop?: number;
  offsetBottom?: number;
  element: Vue | Element | Vue[] | Element[];
  target: HTMLElement | Window | undefined;
  setState: (state: State) => void;
  getState: () => State;
  initialPosition?: ClientRect;
}

export function handleThrottledEvent (eventName: string | null, context: Context) {
  const { target, element, offsetTop, offsetBottom, setState, getState, initialPosition } = context

  let nextState

  const isInitialCall = !eventName

  // Fixme: getBoundingClientRect should always exist on element
  const coordinates = (element as HTMLElement).getBoundingClientRect()

  const options = {
    offsetBottom,
    offsetTop,
    target,
  }

  if (isInitialCall && initialPosition) {
    nextState = computeAffixedState({ coordinates: initialPosition, ...options })
  } else {
    nextState = computeAffixedState({ coordinates, ...options })
  }

  const prevState = getState()

  if (checkAffixedStateChange(prevState, nextState)) {
    setState({ ...nextState, width: coordinates.width })
  } else if (prevState.width !== coordinates.width) {
    setState({ ...prevState, width: coordinates.width })
  }
}

function useCaptureDefault (eventName: string) {
  // This event type must bubble to the Window object only when dispatched on the Document element
  // https://www.w3.org/TR/2014/WD-DOM-Level-3-Events-20140925/#event-type-scroll
  return eventName === 'scroll'
}

type Options = {
  handler: (eventName: string, event: Event) => void;
  useCapture?: (eventName: string) => boolean;
  wait?: number;
}

export function useEventsHandlerWithThrottle (events: string[], {
  handler,
  useCapture = useCaptureDefault,
  wait = 50,
}: Options) {
  const clearHandlersArray = events.map(eventName => {
    const _handler = throttle((event: Event) => handler(eventName, event), wait)

    window.addEventListener(eventName, _handler, useCapture(eventName))

    return () => window.removeEventListener(eventName, _handler, useCapture(eventName))
  })

  return () => clearHandlersArray.forEach(clear => clear())
}

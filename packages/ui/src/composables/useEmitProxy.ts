type Events = string | { listen: string, emit: string }

const getEvent = (event: Events) => typeof event === 'object' ? event.listen : event
const getEmit = (event: Events) => typeof event === 'object' ? event.emit : event

export const useEmitProxy = (events: Events[]) => {
  const createEmits = () => events.map(getEmit)

  const eventToListenerName = (event: string) => {
    const eventName = event.charAt(0).toUpperCase() + event.slice(1)
    return `on${eventName}`
  }

  const createListeners = (emit: (event: string, ...args: any[]) => void) => {
    return events.reduce((acc, key) => ({
      ...acc,
      [eventToListenerName(getEvent(key))]: (...args: any[]) => emit(getEmit(key), ...args),
    }), {} as Record<string, any>)
  }

  const createVOnListeners = (emit: (event: string, ...args: any[]) => void) => {
    return events.reduce((acc, key) => ({
      ...acc,
      [getEvent(key)]: (...args: any[]) => emit(getEmit(key), ...args),
    }), {} as Record<string, any>)
  }

  return {
    createListeners,
    createVOnListeners,
    createEmits,
  }
}

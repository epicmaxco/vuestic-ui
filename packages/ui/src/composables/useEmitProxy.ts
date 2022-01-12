type Events = string | [string, string]

const getEvent = (event: Events) => Array.isArray(event) ? event[0] : event
const getEmit = (event: Events) => Array.isArray(event) ? event[1] : event

export const useEmitProxy = (events: Events[]) => {
  const createEmits = () => events.map(event => getEmit(event))

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

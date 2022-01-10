export const useEmitProxy = <T extends string>(events: T[]) => {
  const createEmits = () => {
    return events
  }

  const eventToListenerName = (event: string) => {
    const eventName = event.charAt(0).toUpperCase() + event.slice(1)
    return `on${eventName}`
  }

  const createListeners = (emit: (event: T, ...args: any[]) => void) => {
    return events.reduce((acc, key) => ({
      ...acc, [eventToListenerName(key)]: (...args: any[]) => emit(key, ...args),
    }), {} as Record<string, any>)
  }

  return {
    createListeners,
    createEmits,
  }
}

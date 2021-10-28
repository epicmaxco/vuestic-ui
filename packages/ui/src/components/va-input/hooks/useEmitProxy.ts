export const useEmitProxy = <T extends string>(events: T[]) => {
  const createEmits = () => {
    return events
  }

  const createListeners = (emit: (event: T, ...args: any[]) => void) => {
    return events.reduce((acc, key) => ({
      ...acc, [key]: (...args: any[]) => emit(key, ...args),
    }), {} as Record<T, any>)
  }

  return {
    createListeners,
    createEmits,
  }
}

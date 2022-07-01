type SetTimeout = Window['setTimeout']

export const useTimer = () => {
  let timer: ReturnType<SetTimeout> | undefined

  const start = (...args: Parameters<SetTimeout>) => {
    timer = window.setTimeout(...args)

    return timer
  }

  const clear = () => timer && window.clearTimeout(timer)

  return {
    start,
    clear,
  }
}

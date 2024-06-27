export const throttle = <F extends (...args: any) => unknown>(func: F, wait: number) => {
  let lastTime = 0
  return function (this: any, ...args: Parameters<F>) {
    const now = Date.now()
    if (now - lastTime < wait) { return }
    func.apply(this, args)
    lastTime = now
  } as F
}

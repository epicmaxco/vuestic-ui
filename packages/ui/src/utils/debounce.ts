export const debounce = <F extends (...args: any) => unknown>(func: F, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  const fn = function (this: any, ...args: Parameters<F>) {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      func.apply(this, args)
    }, wait)
  } as F & { cancel: () => void }

  fn.cancel = () => {
    timeout && clearTimeout(timeout)
    timeout = null
  }

  return fn
}

import { Ref, unref } from 'vue'

export const useDebounceFn = <F extends (...args: any) => unknown>(func: F, delay: Ref<number | undefined> | number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const fn = function (this: any, ...args: Parameters<F>) {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      func.apply(this, args)
    }, unref(delay))
  } as F & { cancel: () => void }

  fn.cancel = () => {
    timeout && clearTimeout(timeout)
    timeout = null
  }

  return fn
}

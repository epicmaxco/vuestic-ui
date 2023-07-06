/**
 * Add event listener to element if it is element
 * In case if it SVGElement, it will try to add event listener to parentElement
 * Otherwise it will do nothing
 */
export const addEventListener = (target: unknown, ...args: Parameters<HTMLElement['addEventListener']>) => {
  if (!target || typeof target !== 'object') { return }

  if ('addEventListener' in target && typeof target.addEventListener === 'function') {
    target.addEventListener(...args)
    return
  }

  if ('parentElement' in target) {
    addEventListener(target.parentElement, ...args)
  }
}

/**
 * Remove event listener to element if it is element
 * In case if it SVGElement, it will try to add event listener to parentElement
 * Otherwise it will do nothing
 */
export const removeEventListener = (target: unknown, ...args: Parameters<HTMLElement['addEventListener']>) => {
  if (!target || typeof target !== 'object') { return }

  if ('removeEventListener' in target && typeof target.removeEventListener === 'function') {
    target.removeEventListener(...args)
    return
  }

  if ('parentElement' in target) {
    removeEventListener(target.parentElement, ...args)
  }
}

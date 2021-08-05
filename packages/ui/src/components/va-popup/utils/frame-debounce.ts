/* eslint-disable */
// @ts-nocheck

export default function (fn: any) {
  let wait = false
  let frame: any

  function debounced (...args: any) {
    if (wait) {
      return
    }

    wait = true
    frame = requestAnimationFrame(() => {
      fn.apply(this, args)
      wait = false
    })
  }

  debounced.cancel = () => {
    window.cancelAnimationFrame(frame)
    wait = false
  }

  return debounced
}

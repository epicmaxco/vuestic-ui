import { Component, ComponentPublicInstance, unref } from 'vue'

/**
 * Used to get the HTMLElement from template refs.
 * @param el component, dom element or nothing
 * @returns HTMLElement or undefined
 */
export const unwrapEl = <T extends HTMLElement | ComponentPublicInstance | Component | undefined | null>(el: T) => {
  if (!el) { return }
  if (typeof el !== 'object') { return }

  el = unref(el)

  if (!el) { return }

  if (typeof (el as ComponentPublicInstance).$el !== 'undefined') {
    return (el as ComponentPublicInstance).$el as HTMLElement
  }

  return el as HTMLElement
}

import { ComponentPublicInstance, DefineComponent, unref } from 'vue'
import type { TemplateRef } from './types/template-ref'

// TODO: DefineComponent is actually can't be template ref: remove it

export {
  TemplateRef,
}

/**
 * Used to get the HTMLElement from template refs.
 * @param el component, dom element or nothing
 * @returns HTMLElement or undefined
 */
export const unwrapEl = <T extends TemplateRef | DefineComponent | undefined>(el: T) => {
  if (!el) { return }
  if (typeof el !== 'object') { return }

  el = unref(el)

  if (!el) { return }

  if (typeof (el as ComponentPublicInstance).$el !== 'undefined') {
    return (el as ComponentPublicInstance).$el as HTMLElement
  }

  return el as HTMLElement
}

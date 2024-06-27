import { userEvent as event } from '@storybook/testing-library'
import { sleep } from '../../src/utils/sleep'

export const userEvent = {
  click: async (element: Element, options?: { delay?: number, clientX?: number, clientY?: number, skipPointerEventsCheck?: boolean }) => {
    const defaultOptions = { delay: 0, skipPointerEventsCheck: false }
    const mergedOptions = { ...defaultOptions, ...options }
    const { delay, skipPointerEventsCheck } = mergedOptions

    event.click(element, options, { skipHover: true, skipPointerEventsCheck })
    // waiting for DOM changes
    await sleep(delay)
  },

  type: async (element: Element, text: string, options?: { sleep?: boolean, delay?: number }) => {
    const defaultOptions = { sleep: true, delay: 0 }
    const mergedOptions = { ...defaultOptions, ...options }
    const { sleep: boolSleep, delay } = mergedOptions

    event.type(element, text)
    // waiting for DOM changes
    if(boolSleep) await sleep(delay)
  },

  hover: async (element: Element, options?: { delay?: number }) => {
    const defaultOptions = { delay: 0 }
    const mergedOptions = { ...defaultOptions, ...options }

    event.hover(element)
    // waiting for DOM changes
    await sleep(mergedOptions.delay)
  },

  unhover: async (element: Element, options?: { delay?: number }) => {
    const defaultOptions = { delay: 0 }
    const mergedOptions = { ...defaultOptions, ...options }

    event.unhover(element)
    // waiting for DOM changes
    await sleep(mergedOptions.delay)
  },

  clear: async (element: Element) => event.clear(element),

  focus: async (element: Element, options?: { delay?: number }) => {
    if ('focus' in element) {
      (element as HTMLElement).focus();
      (element as HTMLElement).dispatchEvent(new FocusEvent('focus'));
    }

    const defaultOptions = { delay: 0 }
    const mergedOptions = { ...defaultOptions, ...options }

    await sleep(mergedOptions.delay)
  },

  blur: async (element: Element, options?: { delay?: number }) => {
    if ('blur' in element) {
      (element as HTMLElement).blur();
      (element as HTMLElement).dispatchEvent(new FocusEvent('blur'));
    }

    const defaultOptions = { delay: 0 }
    const mergedOptions = { ...defaultOptions, ...options }

    await sleep(mergedOptions.delay)
  },

  tab: async (options?: { delay?: number, shift?: boolean }) => {
    const defaultOptions = { delay: 0 }
    const mergedOptions = { ...defaultOptions, ...options }

    event.tab(mergedOptions)
    // waiting for DOM changes
    await sleep(mergedOptions.delay)
  }
}

export const isServer = () => typeof window === 'undefined'
export const isClient = () => !isServer()
export const getWindow = (): Window | undefined => typeof window === 'undefined' ? undefined : window
export const getDocument = (): Document | undefined => typeof document === 'undefined' ? undefined : document

const fakeGlobal = {}
export const getGlobal = () => {
  if (isServer()) {
    if (typeof globalThis === 'undefined') {
      return fakeGlobal as Window
    }
    return globalThis as any as Window
  } else {
    return window
  }
}

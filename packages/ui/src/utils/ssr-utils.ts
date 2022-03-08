export const isServer = () => typeof window === 'undefined'
export const isClient = () => !isServer()

const fakeGlobal = {}
export const getGlobal = () => {
  if (isServer()) {
    if (typeof global === 'undefined') {
      return fakeGlobal as Window
    }
    return global as any as Window
  } else {
    return window
  }
}

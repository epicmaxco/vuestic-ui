export const isServer = () => typeof window === 'undefined'
export const isClient = () => !isServer()

export const getGlobal = () => {
  if (isServer()) {
    return global
  } else {
    return window
  }
}

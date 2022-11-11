import { __DEV__ } from './env'

/** Vuestic warn. Disabled in production */
export const warn = (...attrs: any[]) => {
  if (__DEV__) {
    // eslint-disable-next-line  no-console
    console.warn(...attrs)
  }
  return false
}

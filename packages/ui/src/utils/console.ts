import { isDev } from './env'

/** Vuestic warn. Disabled in production */
export const warn = (...attrs: any[]) => {
  if (isDev) {
    // eslint-disable-next-line  no-console
    console.warn(...attrs)
  }
  return false
}

export const throwError = (message: string) => {
  throw new Error(`[Vuestic] ${message}`)
}

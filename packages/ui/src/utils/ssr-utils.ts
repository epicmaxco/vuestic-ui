export const isServer = () => typeof window === 'undefined'
export const isClient = () => !isServer()
export const getWindow = (): Window | undefined => typeof window === 'undefined' ? undefined : window
export const getDocument = (): Document | undefined => typeof document === 'undefined' ? undefined : document

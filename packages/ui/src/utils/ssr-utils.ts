export const isServer = () => typeof window === 'undefined'
export const isClient = () => !isServer()

const processShim: typeof process = typeof process !== 'undefined' ? process : ({} as typeof process)
const envShim = processShim.env || ({} as typeof process.env)
const nodeEnv = envShim.NODE_ENV || ''

export const __DEV__ = !['prod', 'production'].includes(nodeEnv)

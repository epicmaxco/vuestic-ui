/** Returns true if value is function */
export const isFunction = (value: any): value is (...args: any[]) => any => typeof value === 'function'

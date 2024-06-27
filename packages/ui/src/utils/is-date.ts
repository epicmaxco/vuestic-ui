export const isDate = (value: unknown): value is Date => Object.prototype.toString.call(value) === '[object Date]'

export const isPromise = (value: any): value is Promise<any> => {
  return typeof value === 'object' && typeof value.then === 'function'
}

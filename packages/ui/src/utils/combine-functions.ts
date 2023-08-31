/** Makes one function from multiple functions. Used to combine event listener callbacks */
export const combineFunctions = <A, T extends (...args: A[]) => any>(...list: T[]) => {
  return (...args: Parameters<T>) => list.forEach((fn) => fn(...args))
}

type FindByKey<T, Key extends string | number | symbol> = Key extends `${infer K}.${infer R}` ?
  K extends keyof T ? FindByKey<T[K], R> : never
  : Key extends keyof T ? T[Key] : never

/**
 * Access object by string path
 *
 * @example
 *
 * ```
 * const obj = {
 *   user: {
 *     name: 'Maksim'
 *   }
 * }
 *
 * getByPath(obj, 'user.name') // 'Maksim'
 * ```
 */
export const getByPath = <T, Key extends string | number | symbol>(obj: T, path: Key, defaultValue?: any): FindByKey<T, Key> => {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key as string] : res), obj as any)
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)
  return result === undefined || result === obj ? defaultValue : result
}

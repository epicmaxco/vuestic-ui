type MaybePromise<T> = Promise<T> | T

export const withCwd = (cwd: string, fn: ((...args: any[]) => MaybePromise<any>)) => {
  const cwdBefore = process.cwd()
  process.chdir(cwd)
  const result = fn()

  if (result instanceof Promise) {
    result.finally(() => process.chdir(cwdBefore))
  } else {
    process.chdir(cwdBefore)
  }

  return result
}
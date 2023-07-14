export const promiseSequence = async <T>(promises: Promise<T>[]) => {
  const results = []
  for (const promise of promises) {
    results.push(await promise)
  }
  return results
}
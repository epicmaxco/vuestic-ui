// TODO: MAybe use pinia here
/** Make composable values global */
export const defineGlobal = <R>(composable: () => R): () => R => {
  const result = composable()

  return () => result
}

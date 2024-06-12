export const omit = <Obj extends Record<string, any>, Keys extends keyof Obj>(o: Obj, keys: readonly Keys[]) => {
  return ((Object.keys(o) as (keyof Obj)[])
    .filter((key: keyof Obj) => !keys.includes(key as Keys)) as (keyof Omit<Obj, Keys>)[])
    .reduce((acc, key) => {
      acc[key] = o[key]
      return acc
    }, { } as Omit<Obj, Keys>)
}

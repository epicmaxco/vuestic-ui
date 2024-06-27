export const pick = <Obj extends Record<string, any>, Keys extends keyof Obj>(o: Obj, keys: Keys[]) => {
  return (Object.keys(o) as Keys[])
    .filter((key: Keys) => keys.includes(key as Keys))
    .reduce((acc: Pick<Obj, Keys>, key: Keys) => {
      acc[key] = o[key]
      return acc
    }, { } as Pick<Obj, Keys>)
}

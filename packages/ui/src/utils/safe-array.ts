export type MaybeArray<T> = T | T[];

export const safeArray = <T>(a: MaybeArray<T>) => (Array.isArray(a) ? a : [a])

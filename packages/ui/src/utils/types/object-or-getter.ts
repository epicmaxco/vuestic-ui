export type ObjectOrGetter<T extends object, P> = T | ((props: P) => T)

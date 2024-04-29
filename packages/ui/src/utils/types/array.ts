export type ReadonlyOrPlainArray<T> = Array<T> | Readonly<Array<T>>;

export type ArrayElementType<T extends ReadonlyOrPlainArray<any>> = T[number];

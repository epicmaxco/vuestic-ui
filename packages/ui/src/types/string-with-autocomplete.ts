/** This will accept any string, but will suggest all strings from `T`. Used for better IDE support in component props. */
export type StringWithAutocomplete<T> = T | (string & Record<never, never>)

// IDK, it is not working)))
export type UnwrapStringWithAutocomplete<T> = T extends StringWithAutocomplete<infer U> ? U : never

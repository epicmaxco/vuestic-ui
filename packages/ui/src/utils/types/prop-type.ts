import type { PropType } from 'vue'

/** This will accept any string, but will suggest all strings from `T`. Used for better IDE support in component props. */
export type StringWithAutocomplete<T> = T | (string & Record<never, never>)

// Make sure to make StringType as generic to prevent type unwrapping
/**
 * Vuestic custom PropType for better DX.
 * Prop accept any string, but will show autocomplete in IDE. We don't want user to write `as const` every time.
 */
export type AnyStringPropType<
  T,
  StringType = StringWithAutocomplete<T>
  // True hack makes TS ignore VaPropType type name :). So it looks like `PropType<T>`
> = true extends boolean ? PropType<T extends string ? StringType : T> : never

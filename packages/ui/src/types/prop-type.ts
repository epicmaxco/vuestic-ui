import type { PropType } from 'vue'
import type { StringWithAutocomplete } from './string-with-autocomplete'

// Make sure to make StringType as generic to prevent type unwrapping
/**
 * Vuestic custom PropType for better DX.
 * Prop accept any string, but will show autocomplete in IDE. We don't want user to write `as const` everytime.
 */
export type AnyStringPropType<
  T,
  StringType = StringWithAutocomplete<T>
  // True hack makes TS ignore VaPropType type name :). So it looks like `PropType<T>`
> = true extends boolean ? PropType<T extends string ? StringType : T> : never

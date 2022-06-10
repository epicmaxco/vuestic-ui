import type { PropType } from 'vue'
import type { StringWithAutocomplete } from './string-with-autocomplete'

// Make sure to make StringType as generic to prevent type unwrapping
export type VaPropType<
  T,
  StringType = StringWithAutocomplete<T>
> = PropType<T extends string ? StringType : T>

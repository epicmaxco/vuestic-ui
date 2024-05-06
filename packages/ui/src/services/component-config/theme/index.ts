import { StringWithAutocomplete } from '../../../utils/types/prop-type'

export interface SizePreset<Variables extends string> {
  variables: Partial<Record<Variables, string>>;
}

export type SizeValue<T> = StringWithAutocomplete<T> | number

export type SizesConfig<Variables extends string, SizeName extends string> = Partial<Record<SizeValue<SizeName>, SizePreset<Variables>>>;

export interface SizeProps<T extends SizesConfig<string, string>> {
  size?: SizeValue<T extends SizesConfig<string, infer SizeName> ? SizeName : never>;
  sizesConfig?: T;
}

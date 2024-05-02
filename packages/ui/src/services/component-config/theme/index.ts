export interface SizePreset<Variables extends string> {
  variables: Partial<Record<Variables, string>>;
}

/**
 * @see To allow union of string and string literals https://stackoverflow.com/questions/61047551/typescript-union-of-string-and-string-literals
 */
export type SizeValue<T> = T | (string & {}) | number

export type SizesConfig<Variables extends string, SizeName extends string> = Partial<Record<SizeValue<SizeName>, SizePreset<Variables>>>;

export interface SizeProps<T extends SizesConfig<string, string>> {
  size?: SizeValue<T extends SizesConfig<string, infer SizeName> ? SizeName : never>;
  sizesConfig?: T;
}

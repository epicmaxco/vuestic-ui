export interface SizePreset<Variables extends string> {
  variables: Record<Variables, string>;
}

export type SizesConfig<Variables extends string, SizeName extends string> = Record<SizeName, SizePreset<Variables>>;

export interface SizeProps<T extends SizesConfig<string, string>> {
  size?: (T extends SizesConfig<string, infer SizeName> ? SizeName : never) | string | number;
  sizesConfig?: T;
}

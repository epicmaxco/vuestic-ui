export type ColorsCustomClassesConfig = {
  prefix?: string
  postfix?: string
  property?: string | string[]
  value?: string
}

export type ColorsCustomClassesConfigPreset = Record<string, ColorsCustomClassesConfig[]>

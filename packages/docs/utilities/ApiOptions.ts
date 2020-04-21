export type TranslationString = string
export type VersionString = string // vuestic-ui version at which feature was first introduced

export type PropApiOptions = {
  local?: boolean
  version?: VersionString
}

export type ApiOptions = {
  version: VersionString,
  props?: Record<string, PropApiOptions>,
  localProps?: Record<string, boolean>,
  methods?: Record<string, string>,
  events?: Record<string, string>,
}

export type ApiRowOptions = {
  version: VersionString,
  componentName: string, // required to form translation string
  name: string,
  required: string,
  types: string,
  default: string,
  description: TranslationString,
}

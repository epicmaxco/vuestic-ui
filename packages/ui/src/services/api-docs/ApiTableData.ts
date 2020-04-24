// This file is intended for all support types for ApiDocs component.
// We don not want to keep objects or other types of data, that requires
// conversion, only strings that go directly to table.

import { VersionString, TranslationString } from './ManualApiOptions'

export type ApiRowOptions = {
  version: VersionString,
  description: TranslationString,
  name: string,
  required: boolean,
  types: string,
}

export type ApiPropRowOptions = ApiRowOptions & {
  default: string,
}

export type ApiSlotRowOptions = ApiRowOptions & {
  // add more here
}

export type ApiEventRowOptions = ApiRowOptions & {
  // add more here
}

export type ApiMethodRowOptions = ApiRowOptions & {
  // add more here
}

export type ApiTableData = {
  name: string, // component name, required for translation strings forming.
  props: Record<string, ApiPropRowOptions>,
  slots: Record<string, ApiSlotRowOptions>,
  events: Record<string, ApiEventRowOptions>,
  methods: Record<string, ApiMethodRowOptions>,
}

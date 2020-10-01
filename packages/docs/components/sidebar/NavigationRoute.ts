import { TranslationString } from '../../../ui/src/services/api-docs/ManualApiOptions'

export type NavigationRoute = {
  name: string,
  hash?: string,
  path?: string,
  childrenCategories?: TranslationString[],
  category?: TranslationString,
  displayName: TranslationString,
  meta?: {
    iconClass: string,
  },
  disabled?: boolean,
  children?: NavigationRoute[],
}

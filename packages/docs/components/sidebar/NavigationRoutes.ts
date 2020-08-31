import { TranslationString } from '../../../ui/src/services/api-docs/ManualApiOptions'

export type NavigationRoute = {
  name: string,
  childrenCategories?: TranslationString[],
  category?: TranslationString,
  displayName: TranslationString,
  meta?: {
    iconClass: string,
  },
  disabled?: boolean,
  children?: NavigationRoute[],
}

export type NavigationScheme = {
  root: NavigationRoute,
  routes: NavigationRoute[],
}

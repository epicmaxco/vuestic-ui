import { TranslationString } from '../../../ui/src/services/api-docs/ManualApiOptions'
import scheme from './navigationScheme.json'

export type NavigationRoute = {
  name: string,
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

export const navigationRoutes: NavigationScheme = scheme

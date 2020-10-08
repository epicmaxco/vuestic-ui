import { TranslationString } from '../../../ui/src/services/api-docs/ManualApiOptions'

export type NavigationRoute = {
  name: string,
  category?: TranslationString,
  displayName: TranslationString,
  meta?: {
    iconClass: string,
  },
  disabled?: boolean,
  children?: NavigationRoute[],
}

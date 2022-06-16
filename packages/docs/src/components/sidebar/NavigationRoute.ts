import { TranslationString } from '../DocsApi/ManualApiOptions'

export type NavigationRoute = {
  name: string,
  category?: TranslationString,
  displayName: TranslationString,
  meta?: {
    iconClass?: string,
    badge?: 'wip' | 'new'
  },
  disabled?: boolean,
  children?: NavigationRoute[],
  path?: string,
}

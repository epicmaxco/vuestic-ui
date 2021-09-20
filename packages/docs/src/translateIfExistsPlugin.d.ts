import { TranslateIfExists } from './locales/translateIfExistsPlugin'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $tie: TranslateIfExists
  }
}

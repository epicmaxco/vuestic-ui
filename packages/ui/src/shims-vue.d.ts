// declare module '*.vue' {
//   import { DefineComponent } from '@vue/runtime-core'
//   const component: DefineComponent<{}, {}, any>
//   export default component
// }

import * as Vue from 'vue'
import type { VuesticComponents } from '@/services/vue-plugin'

declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface GlobalComponents extends VuesticComponents {}
}

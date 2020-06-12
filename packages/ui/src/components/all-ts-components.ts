// Temporary file.
// Rollup doesn't like mixing <script> and <scrip lang="ts"> components for some reason.
// So this list is for subset of components that use only TS internally.
// Intention is to gradually move all components here.
// At current state it allows to test/tweak build process.

import VaAvatar from './vuestic-components/va-avatar/VaAvatar.vue'
import { VueConstructor } from 'vue'

export const allComponents = [
  VaAvatar,
] as (VueConstructor & {name: string})[]

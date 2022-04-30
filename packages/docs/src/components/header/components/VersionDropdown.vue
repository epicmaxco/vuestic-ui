<template>
  <div class="version-dropdown">
    v{{ uiVersion }}
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { Options, Vue } from 'vue-class-component'
import packageUi from 'vuestic-ui/package.json'

@Options({
  name: 'DocsVersionDropdown',
})

export default class VersionDropdown extends Vue {
  data () {
    return {
    }
  }

  get uiVersion () {
    return `${packageUi.version}`
  }
}
</script>

<style lang="scss">
.version-dropdown {
  color: var(--va-primary);
  font-weight: 600;
}
</style>

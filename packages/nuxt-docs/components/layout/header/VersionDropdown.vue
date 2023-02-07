<template>
  <div class="version-dropdown">
    v{{ uiVersion }}
  </div>
</template>

<script lang="ts" setup>
import packageUi from 'vuestic-ui/package.json'

const uiVersion = packageUi.version
</script>

<style lang="scss">
.version-dropdown {
  color: var(--va-text-primary);
  font-weight: 600;
}
</style>

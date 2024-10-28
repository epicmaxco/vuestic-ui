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
  font-weight: 600;
  opacity: 0.8;
}
</style>

<template functional>
  <div class="spacer" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'VaSpacer',
})
export default class VaSpacer extends Vue {}
</script>

<style lang="scss" scoped>
  .spacer {
    flex-grow: 1 !important;
  }
</style>

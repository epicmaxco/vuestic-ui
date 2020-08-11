<template functional>
  <div class="spacer" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'VaSpacer',
})
export default class VaSpacer extends Vue {}
</script>

<style lang="scss" scoped>
  .spacer {
    flex-grow: 1 !important;
  }
</style>

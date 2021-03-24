<template functional>
  <div class="spacer"/>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({
  name: 'VaSpacer',
})
export default class VaSpacer extends Vue {
}
</script>

<style lang="scss">
@import 'variables';

.spacer {
  flex-grow: var(--va-spacer-flex-grow);
}
</style>

<template>
  <va-card color="secondary" style="padding: 0.75rem;">
    <div class="row">
      <div class="flex">
        <div class="flex-center">Now I'm flexible</div>
      </div>
    </div>
  </va-card>
</template>

<script>
import VaCard from '../../../ui/src/components/vuestic-components/va-card/VaCard'
export default {
  components: { VaCard },
}
</script>

<style lang="scss" scoped>
@import 'vuestic-ui/src/components/vuestic-sass/resources/resources';

.flex-center {
  border: 1px solid $gray;
  background-color: $white;
}
</style>

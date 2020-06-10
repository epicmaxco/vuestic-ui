<template>
  <va-card color="secondary" style="padding: 0.75rem;">
    <div class="row">
      <div class="flex" style="width: 100%;">
        <div class="item">Now I'm flexible</div>
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

.item {
  border: 1px solid $gray;
  background-color: $white;
  text-align: center;
}
</style>

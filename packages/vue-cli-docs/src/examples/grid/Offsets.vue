<template>
  <va-card color="secondary" style="padding: 0.75rem;">
    <div class="row">
      <div class="flex xs1 offset--md3 offset--lg2">
        <div class="item">First</div>
      </div>
      <div class="flex xs1 offset--md1 offset--lg3">
        <div class="item">Second</div>
      </div>
      <div class="flex xs1 offset--md2 offset--lg1">
        <div class="item">Last</div>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="flex xs1 offset--md4 offset--lg1">
        <div class="item">First</div>
      </div>
      <div class="flex xs1 offset--md2 offset--lg2">
        <div class="item">Second</div>
      </div>
      <div class="flex xs1 offset--md1 offset--lg6">
        <div class="item">Last</div>
      </div>
    </div>
  </va-card>
</template>

<script>
import VaCard from 'vuestic-ui-dev/src/components/vuestic-components/va-card/VaCard'
export default {
  components: { VaCard },
}
</script>

<style lang="scss" scoped>
@import '~vuestic-ui-dev/src/components/vuestic-sass/resources/resources';

.item {
  border: 1px solid $gray;
  background-color: $white;
  text-align: center;
}
</style>

<template>
  <va-card color="secondary" style="padding: 0.75rem;">
    <div class="row">
      <div class="flex md12">
        <div class="item">md12</div>
      </div>
      <div class="flex md6">
        <div class="item">md6</div>
      </div>
      <div class="flex md6">
        <div class="item">md6</div>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="flex md12">
        <div class="item">md12</div>
      </div>
      <div class="flex md9">
        <div class="item">md9</div>
      </div>
      <div class="flex md3">
        <div class="item">md3</div>
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

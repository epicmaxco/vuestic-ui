<template>
  <va-card color="secondary" style="padding: 0.75rem;">
    <div class="layout gutter--md">
      <div class="row">
        <div class="flex xs6">
          <div class="item">gutter--md</div>
        </div>
        <div class="flex xs6">
          <div class="item">gutter--md</div>
        </div>
      </div>
    </div>
    <br />
    <div class="layout gutter--xl">
      <div class="row">
        <div class="flex xs6">
          <div class="item">gutter--xl</div>
        </div>
        <div class="flex xs6">
          <div class="item">gutter--xl</div>
        </div>
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

.layout {
  background-color: $lighter-gray;
}

.item {
  border: 1px solid $gray;
  background-color: $white;
  text-align: center;
}
</style>

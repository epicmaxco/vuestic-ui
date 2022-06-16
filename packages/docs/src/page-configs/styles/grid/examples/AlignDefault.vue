<template>
  <va-card color="background" style="padding: 0.75rem;">
    <!-- align--start -->
    <div class="row align--start">
      <div class="flex xs12">
        <div class="item">align--start</div>
      </div>
    </div>

    <!-- align--end -->
    <div class="row align--end">
      <div class="flex xs12">
        <div class="item">align--end</div>
      </div>
    </div>

    <!-- align--center -->
    <div class="row align--center">
      <div class="flex xs12">
        <div class="item">align--center</div>
      </div>
    </div>

    <!-- align--baseline -->
    <div class="row align--baseline">
      <div class="flex xs12">
        <div class="item">align--baseline</div>
      </div>
    </div>
  </va-card>
</template>

<script>
import VaCard from 'vuestic-ui/src/components/va-card/VaCard'

export default {
  components: { VaCard },
}
</script>

<style lang="scss" scoped>
@import '~vuestic-ui/src/styles/resources';

.row {
  min-height: 6rem;

  & + .row {
    border-top: 1px solid $lighter-gray;
  }
}

.item {
  border: 1px solid $gray;
  background-color: $white;
  text-align: center;
}
</style>

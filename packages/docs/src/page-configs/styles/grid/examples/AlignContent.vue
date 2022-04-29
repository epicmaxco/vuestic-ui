<template>
  <va-card color="background" style="padding: 0.75rem;">
    <!-- align-content--start -->
    <div class="row align-content--start">
      <div class="flex xs6">
        <div class="item">align-content--start</div>
      </div>
      <div class="flex xs6">
        <div class="item">align-content--start</div>
      </div>
      <div class="flex xs12">
        <div class="item">align-content--start</div>
      </div>
    </div>

    <!-- align-content--end -->
    <div class="row align-content--end">
      <div class="flex xs6">
        <div class="item">align-content--end</div>
      </div>
      <div class="flex xs6">
        <div class="item">align-content--end</div>
      </div>
      <div class="flex xs12">
        <div class="item">align-content--end</div>
      </div>
    </div>

    <!-- align-content--center -->
    <div class="row align-content--center">
      <div class="flex xs6">
        <div class="item">align-content--center</div>
      </div>
      <div class="flex xs6">
        <div class="item">align-content--center</div>
      </div>
      <div class="flex xs12">
        <div class="item">align-content--center</div>
      </div>
    </div>

    <!-- align-content--space-between -->
    <div class="row align-content--space-between">
      <div class="flex xs6">
        <div class="item">align-content--space-between</div>
      </div>
      <div class="flex xs6">
        <div class="item">align-content--space-between</div>
      </div>
      <div class="flex xs12">
        <div class="item">align-content--space-between</div>
      </div>
    </div>

    <!-- align-content--space-around -->
    <div class="row align-content--space-around">
      <div class="flex xs6">
        <div class="item">align-content--space-around</div>
      </div>
      <div class="flex xs6">
        <div class="item">align-content--space-around</div>
      </div>
      <div class="flex xs12">
        <div class="item">align-content--space-around</div>
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
  min-height: 10rem;

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

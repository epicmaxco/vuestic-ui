<template>
  <va-card color="background" style="padding: 0.75rem;">
    <!-- justify--start -->
    <div class="row justify--start">
      <div class="flex xs2">
        <div class="item">justify--start</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--start</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--start</div>
      </div>
    </div>

    <!-- justify--end -->
    <div class="row justify--end">
      <div class="flex xs2">
        <div class="item">justify--end</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--end</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--end</div>
      </div>
    </div>

    <!-- justify--center -->
    <div class="row justify--center">
      <div class="flex xs2">
        <div class="item">justify--center</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--center</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--center</div>
      </div>
    </div>

    <!-- justify--space-between -->
    <div class="row justify--space-between">
      <div class="flex xs2">
        <div class="item">justify--space</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--space</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--space</div>
      </div>
    </div>

    <!-- justify--space-around -->
    <div class="row justify--space-around">
      <div class="flex xs2">
        <div class="item">justify--around</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--around</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--around</div>
      </div>
    </div>

    <!-- justify--space-evenly -->
    <div class="row justify--space-evenly">
      <div class="flex xs2">
        <div class="item">justify--space-evenly</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--space-evenly</div>
      </div>
      <div class="flex xs2">
        <div class="item">justify--space-evenly</div>
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

.row + .row {
  border-top: 1px solid $lighter-gray;
}

.item {
  border: 1px solid $gray;
  background-color: $white;
  text-align: center;
}
</style>

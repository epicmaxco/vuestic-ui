<template>
  <va-card
    color="background-element"
    class="p-3"
  >
    <!-- align--start -->
    <div class="row align-start">
      <div class="flex flex-col xs12">
        <div class="item">
          align-start
        </div>
      </div>
    </div>

    <!-- align-end -->
    <div class="row align-end">
      <div class="flex flex-col xs12">
        <div class="item">
          align-end
        </div>
      </div>
    </div>

    <!-- items-center -->
    <div class="row items-center">
      <div class="flex flex-col xs12">
        <div class="item">
          items-center
        </div>
      </div>
    </div>

    <!-- align-baseline -->
    <div class="row align-baseline">
      <div class="flex flex-col xs12">
        <div class="item">
          align-baseline
        </div>
      </div>
    </div>
  </va-card>
</template>

<script>
import { VaCard } from "vuestic-ui";

export default {
  components: { VaCard },
};
</script>

<style lang="scss" scoped>
@import "vuestic-ui/styles/grid";

.row {
  min-height: 6rem;

  & + .row {
    border-top: 1px solid var(--va-background-border);
  }
}

.item {
  border: 1px solid var(--va-background-border);
  background-color: var(--va-background-primary);
  text-align: center;
}
</style>

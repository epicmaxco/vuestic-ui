<template>
  <va-card
    color="background-element"
    class="p-3"
  >
    <div class="row">
      <!-- align-self-start -->
      <div class="flex flex-col xs3 align-self-start">
        <div class="item">
          align-self-start
        </div>
      </div>

      <!-- align-self-end -->
      <div class="flex flex-col xs3 align-self-end">
        <div class="item">
          align-self-end
        </div>
      </div>

      <!-- align-self-center -->
      <div class="flex flex-col xs3 align-self-center">
        <div class="item">
          align-self-center
        </div>
      </div>

      <!-- align-self-baseline -->
      <div class="flex flex-col xs3 align-self-baseline">
        <div class="item">
          align-self-baseline
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

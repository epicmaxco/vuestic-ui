<template>
  <VaCard
    color="background-element"
    class="p"
  >
    <div class="row">
      <div
        class="flex flex-col w-full"
      >
        <div class="item">
          Now I'm flexible
        </div>
      </div>
    </div>
  </VaCard>
</template>

<script>
import { VaCard } from "vuestic-ui";
export default {
  components: { VaCard },
};
</script>

<style lang="scss" scoped>
@import "vuestic-ui/styles/grid";

.item {
  border: 1px solid var(--va-background-border);
  background-color: var(--va-background-primary);
  text-align: center;
}
</style>

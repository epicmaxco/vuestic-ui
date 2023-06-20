<template>
  <va-card
    color="background-element"
    style="padding: 0.75rem;"
  >
    <div class="row">
      <div
        class="flex flex-col"
        style="width: 100%;"
      >
        <div class="item">
          Now I'm flexible
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

.item {
  border: 1px solid var(--va-background-border);
  background-color: var(--va-background-primary);
  text-align: center;
}
</style>

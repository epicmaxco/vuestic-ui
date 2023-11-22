<template>
  <VaCard
    color="background-element"
    class="p-3"
  >
    <div class="row">
      <div class="flex flex-col xs1 offset-md3 offset-lg2">
        <div class="item">
          First
        </div>
      </div>
      <div class="flex flex-col xs1 offset-md1 offset-lg3">
        <div class="item">
          Second
        </div>
      </div>
      <div class="flex flex-col xs1 offset-md2 offset-lg1">
        <div class="item">
          Last
        </div>
      </div>
    </div>
    <br>
    <div class="row">
      <div class="flex flex-col xs1 offset-md4 offset-lg1">
        <div class="item">
          First
        </div>
      </div>
      <div class="flex flex-col xs1 offset-md2 offset-lg2">
        <div class="item">
          Second
        </div>
      </div>
      <div class="flex flex-col xs1 offset-md1 offset-lg6">
        <div class="item">
          Last
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

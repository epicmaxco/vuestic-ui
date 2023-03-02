<template>
  <va-card
    color="background-element"
    style="padding: 0.75rem;"
  >
    <div class="layout gutter--md">
      <div class="row">
        <div class="flex flex-col xs6">
          <div class="item">
            gutter--md
          </div>
        </div>
        <div class="flex flex-col xs6">
          <div class="item">
            gutter--md
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="layout gutter--xl">
      <div class="row">
        <div class="flex flex-col xs6">
          <div class="item">
            gutter--xl
          </div>
        </div>
        <div class="flex flex-col xs6">
          <div class="item">
            gutter--xl
          </div>
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

.layout {
  background-color: var(--va-secondary);
}

.item {
  border: 1px solid var(--va-background-border);
  background-color: var(--va-background-primary);
  text-align: center;
}
</style>

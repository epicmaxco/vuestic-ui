<template>
  <va-card color="background" style="padding: 0.75rem">
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
import VaCard from "vuestic-ui/src/components/va-card/VaCard";
export default {
  components: { VaCard },
};
</script>

<style lang="scss" scoped>
@import "vuestic-ui/styles/resources";

.layout {
  background-color: var(--va-background-mute);
}

.item {
  border: 1px solid var(--va-form);
  background-color: var(--va-background-soft);
  text-align: center;
}
</style>

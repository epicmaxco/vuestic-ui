<template>
  <va-card color="background" style="padding: 0.75rem">
    <div class="row">
      <div class="flex" style="width: 100%">
        <div class="item">{{ $t("grid.examples.default.example") }}</div>
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

.item {
  border: 1px solid var(--va-form);
  background-color: var(--va-background-soft);
  text-align: center;
}
</style>

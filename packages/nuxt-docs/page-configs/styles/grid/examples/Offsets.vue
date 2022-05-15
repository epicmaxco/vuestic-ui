<template>
  <va-card color="background" style="padding: 0.75rem">
    <div class="row">
      <div class="flex xs1 offset--md3 offset--lg2">
        <div class="item">{{ $t("grid.examples.offsets.first") }}</div>
      </div>
      <div class="flex xs1 offset--md1 offset--lg3">
        <div class="item">{{ $t("grid.examples.offsets.second") }}</div>
      </div>
      <div class="flex xs1 offset--md2 offset--lg1">
        <div class="item">{{ $t("grid.examples.offsets.last") }}</div>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="flex xs1 offset--md4 offset--lg1">
        <div class="item">{{ $t("grid.examples.offsets.first") }}</div>
      </div>
      <div class="flex xs1 offset--md2 offset--lg2">
        <div class="item">{{ $t("grid.examples.offsets.second") }}</div>
      </div>
      <div class="flex xs1 offset--md1 offset--lg6">
        <div class="item">{{ $t("grid.examples.offsets.last") }}</div>
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
  border: 1px solid $gray;
  background-color: $white;
  text-align: center;
}
</style>

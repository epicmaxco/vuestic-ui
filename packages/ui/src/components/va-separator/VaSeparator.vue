<template>
  <div class="va-separator" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VaSeparator',
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-separator {
  height: var(--va-separator-height);
  background-color: var(--va-separator-background-color);
  margin-top: var(--va-separator-margin-top);
  margin-bottom: var(--va-separator-margin-bottom);

  .va-tabs + & {
    margin-top: 0;
  }

  .va-card .va-card__body:not(.va-card__body--no-padding-h, .va-card__body--no-padding) > & {
    margin-right: -$card-padding;
    margin-left: -$card-padding;
  }
}
</style>

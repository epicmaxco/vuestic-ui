<template>
  <div class="va-separator" aria-hidden="true" />
</template>

<script lang="ts" setup>

defineOptions({
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

  .va-card :is(.va-card__title, .va-card__content, .va-card__actions, .va-card_actions__vertical) > & {
    margin-right: calc(-1 * var(--va-card-padding));
    margin-left: calc(-1 * var(--va-card-padding));
  }
}
</style>

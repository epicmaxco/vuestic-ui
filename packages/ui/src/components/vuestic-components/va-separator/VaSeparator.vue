<template>
  <div class="va-separator" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'VaSeparator',
})
export default class VaSeparator extends Vue {
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";
@import 'variables';

.va-separator {
  height: var(va-separator-height);
  background-color: var(va-separator-background-color);
  margin-top: var(va-separator-margin-top);
  margin-bottom: var(va-separator-margin-bottom);

  .va-tabs + & {
    margin-top: 0;
  }

  .va-card .va-card__body:not(.va-card__body--no-padding-h, .va-card__body--no-padding) > & {
    margin-right: -$card-padding;
    margin-left: -$card-padding;
  }
}
</style>

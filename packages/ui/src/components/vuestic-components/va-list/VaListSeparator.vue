<template>
  <div>
    <div
      class="va-list-separator"
      :class="{
        'va-list-separator--offset': !fit,
        'va-list-separator--spaced': spaced
      }"
    />
  </div>
</template>

<script>
export default {
  name: 'VaListSeparator',
  props: {
    fit: Boolean,
    spaced: Boolean,
  },
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-list-separator {
  height: 1px;
  background-color: $separator-color;

  &--offset {
    margin-left: 1.5rem;
  }

  &--spaced {
    margin: 1.5rem 0;
  }
}
</style>

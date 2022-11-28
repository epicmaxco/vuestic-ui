<template>
  <div class="va-card-block row" :class="classComputed">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'VaCardBlock',

  props: {
    horizontal: {
      type: Boolean,
      default: false,
    },
  },

  setup: (props) => ({
    classComputed: computed(() => ({
      'va-card-block--horizontal': props.horizontal,
    })),
  }),
})
</script>

<style lang="scss">
.va-card-block {
  flex-direction: column;

  & > div:first-child {
    border-top-right-radius: var(--va-card-border-radius);
    border-top-left-radius: var(--va-card-border-radius);
  }

  & > div:last-child {
    border-bottom-right-radius: var(--va-card-border-radius);
    border-bottom-left-radius: var(--va-card-border-radius);
  }

  &--horizontal {
    flex-direction: row;

    & > div:first-child {
      border-radius: var(--va-card-border-radius) 0 0 var(--va-card-border-radius);
    }

    & > div:last-child {
      border-radius: 0 var(--va-card-border-radius) var(--va-card-border-radius) 0;
    }
  }
}
</style>

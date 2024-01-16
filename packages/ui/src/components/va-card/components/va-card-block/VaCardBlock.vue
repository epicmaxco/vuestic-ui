<template>
  <div class="va-card-block" :class="classComputed">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
  name: 'VaCardBlock',
})

const props = defineProps({
  horizontal: {
    type: Boolean,
    default: false,
  },
})

const classComputed = computed(() => ({
  'va-card-block--horizontal': props.horizontal,
}))
</script>

<style lang="scss">
.va-card-block {
  display: flex;
  flex-direction: column;

  & > div:first-child {
    border-top-right-radius: var(--va-card-border-radius);
    border-top-left-radius: var(--va-card-border-radius);
  }

  & > div:last-child {
    border-bottom-right-radius: var(--va-card-border-radius);
    border-bottom-left-radius: var(--va-card-border-radius);
  }

  & > div {
    flex: auto;
  }

  &--horizontal {
    flex-direction: row;

    & > div:first-child {
      border-top-left-radius: var(--va-card-border-radius);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: var(--va-card-border-radius);
    }

    & > div:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: var(--va-card-border-radius);
      border-bottom-right-radius: var(--va-card-border-radius);
    }

    & > .va-divider {
      flex: 0;
    }
  }
}
</style>

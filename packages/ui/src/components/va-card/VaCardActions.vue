<template>
  <div
    class="va-card__actions"
    :class="{ vert: vertical, horiz: !vertical }"
    :style="alignComputed"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAlignProps, useAlign } from '../../../composables/useAlign'

export default defineComponent({
  props: {
    ...useAlignProps,
  },
  setup (props) {
    const { alignComputed } = useAlign(props)

    return {
      alignComputed,
    }
  },
})
</script>

<style lang="scss">
.va-card__actions {
  &.horiz button {
    margin: 0 var(--va-card-actions-btn-margin);

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  &.vert button {
    margin: var(--va-card-actions-btn-margin) 0;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

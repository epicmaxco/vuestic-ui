<template>
  <div class="va-card__actions" :style="alignComputed">
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
  align-items: center;

  button {
    margin-left: 5px;
    margin-right: 5px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>

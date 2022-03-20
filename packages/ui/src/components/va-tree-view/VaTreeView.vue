<template>
  <div class="va-tree-root">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useColor } from '../../composables/useColor'
import { useTreeView } from './hooks/useTreeView'

export default defineComponent({
  name: 'VaTreeView',
  props: {
    color: {
      type: String,
      default: '',
    },
  },
  setup: (props) => {
    return {
      ...useTreeView(props),
      ...useColor(props),
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-tree-root {
  padding: var(--va-tree-root-padding);
  font-family: var(--va-font-family);
}
</style>

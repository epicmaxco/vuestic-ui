<template>
  <div class="va-resize-observer" ref="el">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useResizeObserver } from '../../../composables'

defineOptions({
  name: 'VaLayoutSizeKeeper',
})

const emit = defineEmits({
  resize: (size: DOMRectReadOnly) => true,
})

const el = ref()

useResizeObserver(el, ([size]) => {
  requestAnimationFrame(() => emit('resize', size.contentRect))
})
</script>

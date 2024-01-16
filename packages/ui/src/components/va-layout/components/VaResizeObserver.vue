<template>
  <div class="va-resize-observer" ref="el">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

defineOptions({
  name: 'VaLayoutSizeKeeper',
})

const emit = defineEmits({
  resize: (size: DOMRectReadOnly) => true,
})

const el = ref()

let observer: ResizeObserver | null = null

watch(el, (newEl) => {
  if (observer) {
    observer.disconnect()
  }

  observer = new ResizeObserver(([el]) => {
    emit('resize', el.contentRect)
  })

  observer.observe(newEl)
})
</script>

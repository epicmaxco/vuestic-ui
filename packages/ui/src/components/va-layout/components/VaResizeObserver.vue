<template>
  <div class="va-resize-observer" ref="el">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'VaLayoutSizeKeeper',

  emits: {
    resize: (size: DOMRectReadOnly) => true,
  },

  setup (props, { emit }) {
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

    return {
      el,
    }
  },
})
</script>

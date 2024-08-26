<script setup lang="ts">
  import { ref, watchEffect, toRef } from 'vue';
  import { useEvent } from '../../composables/base/useEvent'
  import { useOutline } from '../../composables/useOutlines'
  import { useMutationObserver } from '../../composables/base/useMutationObserver'

  const props = withDefaults(defineProps<{
    node: HTMLElement | null
  }>(), { })

  const rootEl = ref<HTMLElement | null>()

  const updateSize = () => {
    if (!props.node) { return }
    if (!rootEl.value) { return }

    const { top, left, width, height } = props.node!.getBoundingClientRect()
    rootEl.value!.style.top = `${top}px`
    rootEl.value!.style.left = `${left}px`
    rootEl.value!.style.width = `${width}px`
    rootEl.value!.style.height = `${height}px`
  }

  watchEffect(updateSize)

  let prevTimeout: ReturnType<typeof setTimeout>
  useEvent('resize', () => {
    clearTimeout(prevTimeout)
    prevTimeout = setTimeout(updateSize, 0)
  })

  useOutline(updateSize)

  useMutationObserver(toRef(props, 'node'), updateSize)
</script>

<template>
  <div
    v-if="node"
    class="va-devtools-toolbar"
    ref="rootEl"
  >
    <div class="va-devtools-toolbar__toolbar">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.va-devtools-toolbar {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  box-sizing: border-box;
  pointer-events: none;

  &__toolbar {
    transform: translateY(-100%);
    z-index: 1;
    pointer-events: all;
    height: max-content;
  }
}
</style>

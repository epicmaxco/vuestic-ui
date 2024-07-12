<script setup lang="ts">
  import { useColors } from 'vuestic-ui' 
  import { ref, watchEffect, toRef } from 'vue';
  import { useEvent } from '../../composables/base/useEvent'
  import { useOutline } from '../../composables/useOutlines'
  import { useMutationObserver } from '../../composables/base/useMutationObserver'

  const props = withDefaults(defineProps<{
    node: HTMLElement | null
    color?: string
    background?: string
    dashed?: boolean
    thickness?: number
  }>(), {
    color: 'outlinePrimary',
    background: 'transparent',
    dashed: false,
    thickness: 1
  })

  const outlineEl = ref<HTMLElement | null>()

  const { getColor } = useColors()

  const updateSize = () => {
    if (!props.node) { return }
    if (!outlineEl.value) { return }

    const { top, left, width, height } = props.node!.getBoundingClientRect()
    outlineEl.value!.style.top = `${top}px`
    outlineEl.value!.style.left = `${left}px`
    outlineEl.value!.style.width = `${width}px`
    outlineEl.value!.style.height = `${height}px`
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
    class="va-devtools-outline"
    ref="outlineEl"
    :style="{
      borderColor: getColor(color),
      borderStyle: dashed ? 'dashed' : 'solid',
      borderWidth: `${thickness}px`,
      background: getColor(background),
    }"
  />
</template>

<style scoped>
.va-devtools-outline {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  pointer-events: none;
  box-sizing: border-box;
}
</style>

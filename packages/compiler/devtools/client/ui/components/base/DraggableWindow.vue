<template>
  <div
    ref="box"
    class="draggable-window"
    :style="{ top: `${safeTop}px`, left: `${safeLeft}px` }"
  >
    <div class="draggable-window__header" @mousedown="startDrag">
      . . .
    </div>
    <div class="draggable-window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowSize } from '../../composables/base/useWindowSize';
import { useElementRect } from '../../composables/base/useElementRect';

const box = ref()

const windowSize = useWindowSize()
const boxSize = useElementRect(box)

const props = defineProps<{
  defaultPosition: 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left'
}>()

const PADDING = 8

const positions = {
  'top-left': { top: PADDING, left: PADDING },
  'top-right': { top: PADDING, left: windowSize.width },
  'bottom-center': { top: windowSize.height, left: windowSize.width / 2 },
  'bottom-left': { top: windowSize.height, left: PADDING },
}

const top = ref(positions[props.defaultPosition].top)
const left = ref(positions[props.defaultPosition].left)

const safeTop = computed(() => {
  if (top.value < PADDING) {
    return PADDING
  }

  const height = (boxSize.value?.height ?? 0) + PADDING

  if (top.value + height > windowSize.height) {
    return windowSize.height - height
  }
  return top.value
})

const safeLeft = computed(() => {
  let v = left.value

  if (props.defaultPosition.endsWith('center')) {
    v = v - (boxSize.value?.width ?? 0) / 2
  }

  if (v < PADDING) {
    return PADDING
  }

  const width = (boxSize.value?.width ?? 0) + PADDING

  if (v + width > windowSize.width) {
    return windowSize.width - width
  }

  return v
})

let isDragging = false

const startDrag = (event: MouseEvent) => {
  isDragging = true
  const initialX = event.clientX - safeLeft.value
  const initialY = event.clientY - safeTop.value

  const moveHandler = (event: MouseEvent) => {
    if (isDragging) {
      top.value = event.clientY - initialY
      left.value = event.clientX - initialX
    }
  }

  const stopDrag = () => {
    isDragging = false
    window.removeEventListener('mousemove', moveHandler)
    window.removeEventListener('mouseup', stopDrag)
  }

  window.addEventListener('mousemove', moveHandler)
  window.addEventListener('mouseup', stopDrag)
}
</script>

<style lang="scss">
.draggable-window {
  position: fixed;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: visible;
  z-index: 1;

  &__header {
    display: flex;
    justify-content: center;
    cursor: move;
    user-select: none;
  }
}
</style>
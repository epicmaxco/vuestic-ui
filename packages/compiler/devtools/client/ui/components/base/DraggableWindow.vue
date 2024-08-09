<template>
  <div
    ref="box"
    class="draggable-window"
    :style="{ top: `${safeTop}px`, left: `${safeLeft}px` }"
  >
    <!-- <div class="draggable-window__header" @mousedown="startDrag">
      . . .
    </div> -->
    <div class="draggable-window-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useWindowSize } from '../../composables/base/useWindowSize';
import { useElementRect } from '../../composables/base/useElementRect';
import { useEvent } from '../../composables/base/useEvent';

const box = ref()

const windowSize = useWindowSize()
const boxSize = useElementRect(box)

const props = defineProps<{
  defaultPosition: 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left',
  offsetY?: number,
  offsetX?: number,
}>()

const PADDING = 8

const top = ref(0)
const left = ref(0)

const safeTop = computed(() => {
  if (top.value < PADDING) {
    return PADDING
  }

  const offset = props.offsetY ?? 0

  const topValue = top.value + offset

  const height = (boxSize.value?.height ?? 0) + PADDING

  if (topValue + height > windowSize.height) {
    return windowSize.height - height
  }

  if (topValue < PADDING) {
    return PADDING
  }

  return topValue
})

const safeLeft = computed(() => {
  let v = left.value

  if (props.defaultPosition.endsWith('center')) {
    v = v - (boxSize.value?.width ?? 0) / 2
  }

  const offset = props.offsetX ?? 0
  v += offset

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

const updateLeftAndTop = () => {
  const positions = {
    'top-left': { top: PADDING, left: PADDING },
    'top-right': { top: PADDING, left: windowSize.width },
    'bottom-center': { top: windowSize.height, left: windowSize.width / 2 },
    'bottom-left': { top: windowSize.height, left: PADDING },
  }

  top.value = positions[props.defaultPosition].top
  left.value = positions[props.defaultPosition].left
}

onMounted(() => {
  updateLeftAndTop()
})

useEvent('resize', () => {
  updateLeftAndTop()
}, { capture: true })
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

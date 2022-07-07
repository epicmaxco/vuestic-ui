<template>
  <section
    ref="splitContainer"
    aria-label="split panels"
    @mousemove="processDragging"
    @mouseup="stopDragging"
    @mouseleave="stopDragging"
    :style="`display: flex`">
    <div :style="`width: ${splitterPositionComputed}%`">
      <slot name="start" />
    </div>
    <div
      style="min-width: 10px;"
      @mousedown="startDragging">+++</div>
    <div :style="`width: ${100 - splitterPositionComputed}%`">
      <slot name="end" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, shallowRef, computed } from 'vue'

export default defineComponent({
  name: 'VaSplit',

  props: {
    paneSize: {
      type: Number,
      default: 50,
      validator: (v: number) => v <= 100,
    },
    gutterSize: { type: Number, default: 15 },
    vertical: { type: Boolean, default: false },
    resizable: { type: Boolean, default: false },
    maximizeWithDblClick: { type: Boolean, default: false },
    leftPaneMaximization: { type: Boolean, default: false },
    limits: { type: Array as any as PropType<[number, number]>, default: () => [30, 70] },
  },

  emits: ['update:modelValue'],

  setup: (props) => {
    const splitContainer = shallowRef<HTMLElement>()
    const containerSizeComputed = computed(() => {
      if (!splitContainer.value) { return undefined }

      return props.vertical ? splitContainer.value.offsetHeight : splitContainer.value.offsetWidth
    })

    const isDragging = ref(false)
    const dragStartPosition = ref(0)

    const splitterPosition = ref(50)
    const splitterPositionComputed = computed({
      get: () => splitterPosition.value,
      set: (v) => {
        if (v < props.limits[0]) {
          splitterPosition.value = props.limits[0]
        } else if (v > props.limits[1]) {
          splitterPosition.value = props.limits[1]
        } else {
          splitterPosition.value = v
        }
      },
    })

    const startDragging = (e: MouseEvent) => {
      isDragging.value = true
      dragStartPosition.value = props.vertical ? e.pageY : e.pageX
    }

    const processDragging = (e: MouseEvent) => {
      if (!isDragging.value || !containerSizeComputed.value) { return }

      const dragEndPosition = props.vertical ? e.pageY : e.pageX
      const distance = dragEndPosition - dragStartPosition.value
      console.log(distance, dragEndPosition, dragStartPosition.value)

      splitterPositionComputed.value = splitterPositionComputed.value + Math.floor((distance / containerSizeComputed.value) * 100)
    }

    const stopDragging = () => (isDragging.value = false)

    return { splitContainer, startDragging, processDragging, stopDragging, splitterPositionComputed }
  },
})
</script>

<style lang="scss">

</style>

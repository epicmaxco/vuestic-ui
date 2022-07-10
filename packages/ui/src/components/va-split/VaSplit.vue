<template>
  <section
    ref="splitPanelsContainer"
    aria-label="split panels"
    class="va-split"
    :class="classComputed"
    @mousemove="processDragging"
    @mouseup="stopDragging"
    @mouseleave="stopDragging">
    <div
      class="va-split__panel"
      :style="getPanelStyle('start')">
      <slot name="start" />
    </div>
    <div
      class="va-split__dragger"
      :style="draggerStyleComputed"
      @mousedown="startDragging"
      @dblclick="maximizePanel">
      <slot name="grabber">
        <va-divider
          class="fill-width"
          :vertical="!$props.vertical" />
      </slot>
    </div>
    <div
      class="va-split__panel"
      :style="getPanelStyle('end')">
      <slot name="end" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, shallowRef, computed, watch } from 'vue'
import { useBem, useComponentPresetProp, useStateful, useStatefulEmits, useStatefulProps } from '../../composables'
import { __DEV__ } from '../../utils/global-utils'

import { VaDivider } from '../va-divider'

export default defineComponent({
  name: 'VaSplit',

  components: { VaDivider },

  props: {
    ...useComponentPresetProp,
    ...useStatefulProps,
    modelValue: {
      type: Number,
      default: 50,
      validator: (v: number) => v <= 100,
    },
    vertical: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    maximization: { type: Boolean, default: false },
    maximizeStart: { type: Boolean, default: false },
    limits: { type: Array as any as PropType<[number, number]>, default: () => [30, 70] },
  },

  emits: useStatefulEmits,

  setup: (props, { emit }) => {
    const { valueComputed } = useStateful(props, emit)

    const splitPanelsContainer = shallowRef<HTMLElement>()
    const containerSizeComputed = computed(() => {
      if (!splitPanelsContainer.value) { return undefined }
      return props.vertical ? splitPanelsContainer.value.offsetHeight : splitPanelsContainer.value.offsetWidth
    })

    const splitterPosition = ref(props.modelValue)
    const splitterPositionComputed = computed(() => {
      if (splitterPosition.value < props.limits[0]) { return props.limits[0] }
      if (splitterPosition.value > props.limits[1]) { return props.limits[1] }
      return splitterPosition.value
    })

    const isDragging = ref(false)
    const dragStartPosition = ref(0)
    const dragStartSplitterPosition = ref(0)

    const startDragging = (e: MouseEvent) => {
      if (props.disabled || !containerSizeComputed.value) { return }

      isDragging.value = true
      dragStartPosition.value = props.vertical ? e.pageY : e.pageX
      dragStartSplitterPosition.value = splitterPositionComputed.value
    }

    const processDragging = (e: MouseEvent) => {
      if (!isDragging.value) { return }

      const currentPosition = props.vertical ? e.pageY : e.pageX
      const distance = currentPosition - dragStartPosition.value
      splitterPosition.value = dragStartSplitterPosition.value + Math.floor((distance / containerSizeComputed.value!) * 100)
    }

    const maximizePanel = () => {
      if (!props.maximization || props.disabled) { return }

      splitterPosition.value = props.maximizeStart ? props.limits[1] : props.limits[0]
    }

    const stopDragging = () => {
      valueComputed.value = splitterPositionComputed.value
      isDragging.value = false
    }

    watch(valueComputed, (v) => {
      if (__DEV__ && (v < props.limits[0] || v > props.limits[1])) {
        console.warn('Incorrect `modelValue`. Check current `limits` value.')
      }

      splitterPosition.value = v
    })

    const sizePropertyComputed = computed(() => props.vertical ? 'height' : 'width')
    const getPanelStyle = (position: 'start' | 'end') => ({
      [sizePropertyComputed.value]: `${position === 'start' ? splitterPositionComputed.value : 100 - splitterPositionComputed.value}%`,
    })

    const draggerStyleComputed = computed(() => {
      if (props.disabled) { return {} }
      let cursor = props.vertical ? 'var(--va-split-vertical-dragger-cursor)' : 'var(--va-split-horizontal-dragger-cursor)'
      if (isDragging.value) { cursor = 'var(--va-split-dragging-cursor)' }
      return { cursor }
    })

    const classComputed = useBem('va-split', () => ({
      horizontal: !props.vertical,
      vertical: props.vertical,
      dragging: isDragging.value,
    }))

    return {
      splitPanelsContainer,
      startDragging,
      processDragging,
      stopDragging,
      getPanelStyle,
      maximizePanel,
      classComputed,
      draggerStyleComputed,
    }
  },
})
</script>

<style lang="scss">
@import 'variables';

.va-split {
  display: flex;

  &__dragger {
    display: var(--va-split-dragger-display);
  }

  &__panel {
    overflow: var(--va-split-panel-overflow);
  }

  &--dragging {
    & .va-split__panel {
      user-select: none;
      cursor: var(--va-split-dragging-cursor);
    }
  }

  &--vertical {
    flex-direction: column;

    &.va-split__dragger {
      height: var(--va-split-dragger-size);
      align-items: var(--va-split-dragger-align-items);
    }
  }

  &--horizontal {
    flex-direction: row;

    &.va-split__dragger {
      width: var(--va-split-dragger-size);
      justify-content: var(--va-split-dragger-justify-content);
    }
  }
}
</style>

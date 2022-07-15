<template>
  <section
    ref="splitPanelsContainer"
    aria-label="split panels"
    class="va-split"
    :class="classComputed">
    <div
      class="va-split__panel"
      :style="getPanelStyle('start')">
      <slot name="start" />
    </div>
    <div
      class="va-split__dragger"
      :style="draggerStyleComputed"
      @mousedown="startDragging"
      @touchstart="startDragging"
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
import { defineComponent, ref, shallowRef, computed, watch } from 'vue'

import { useBem, useComponentPresetProp, useStateful, useStatefulEmits, useStatefulProps } from '../../composables'
import { useSplitDragger, useSplitDraggerProps } from './useSplitDragger'

import { warn } from '../../services/utils'

import { VaDivider } from '../va-divider'

export default defineComponent({
  name: 'VaSplit',

  components: { VaDivider },

  props: {
    ...useComponentPresetProp,
    ...useSplitDraggerProps,
    ...useStatefulProps,
    modelValue: {
      type: Number,
      default: 50,
      validator: (v: number) => v <= 100,
    },
    maximization: { type: Boolean, default: false },
    maximizeStart: { type: Boolean, default: false },
    minSize: {
      type: Number,
      default: 30,
      validator: (v: number) => v <= 100 && v >= 0,
    },
  },

  emits: useStatefulEmits,

  setup: (props, { emit }) => {
    const { valueComputed } = useStateful(props, emit)

    const splitPanelsContainer = shallowRef<HTMLElement>()
    const containerSizeComputed = computed(() => {
      if (!splitPanelsContainer.value) { return }
      return props.vertical ? splitPanelsContainer.value.offsetHeight : splitPanelsContainer.value.offsetWidth
    })

    const splitterPosition = ref(props.modelValue)
    const splitterPositionComputed = computed(() => {
      if (splitterPosition.value < props.minSize) { return props.minSize }
      if (splitterPosition.value > 100 - props.minSize) { return 100 - props.minSize }
      return splitterPosition.value
    })

    const {
      isDragging,
      startDragging,
      processDragging,
      stopDragging,
      currentSplitterPosition,
    } = useSplitDragger(containerSizeComputed, splitterPositionComputed, props)

    const maximizePanel = () => {
      if (!props.maximization || props.disabled) { return }

      splitterPosition.value = props.maximizeStart ? 100 - props.minSize : props.minSize
    }

    watch(valueComputed, (v) => {
      if (v < props.minSize || v > 100 - props.minSize) { warn('Incorrect `modelValue`. Check current `minSize` prop value.') }

      splitterPosition.value = v
    })

    watch(currentSplitterPosition, (v) => {
      splitterPosition.value = v
    })

    watch(isDragging, (v) => {
      if (!v) { valueComputed.value = splitterPositionComputed.value }
      document.documentElement.style.cursor = v ? 'var(--va-split-dragging-cursor)' : ''
    })

    const sizePropertyComputed = computed(() => props.vertical ? 'height' : 'width')
    const getPanelStyle = (position: 'start' | 'end') => ({
      [sizePropertyComputed.value]: `${position === 'start' ? splitterPositionComputed.value : 100 - splitterPositionComputed.value}%`,
    })

    const draggerStyleComputed = computed(() => {
      if (props.disabled) { return {} }
      if (isDragging.value) { return { cursor: 'var(--va-split-dragging-cursor)' } }
      return { cursor: props.vertical ? 'var(--va-split-vertical-dragger-cursor)' : 'var(--va-split-horizontal-dragger-cursor)' }
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
    user-select: none;
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

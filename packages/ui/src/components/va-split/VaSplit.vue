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
import { defineComponent, PropType, ref, shallowRef, computed, watch, onMounted } from 'vue'
import isString from 'lodash/isString.js'
import isNumber from 'lodash/isNumber.js'

import { useBem, useComponentPresetProp, useStateful, useStatefulEmits, useStatefulProps, useResizeObserver } from '../../composables'
import { useSplitDragger, useSplitDraggerProps } from './useSplitDragger'

import { warn } from '../../services/utils'

import { VaDivider } from '../va-divider'

type SplitLimit = number | string | string[]

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
    limits: {
      type: Array as any as PropType<[SplitLimit, SplitLimit]>,
      default: () => ['30%', '30%'],
    },
  },

  emits: useStatefulEmits,

  setup: (props, { emit }) => {
    const splitPanelsContainer = shallowRef<HTMLElement>()

    const { valueComputed } = useStateful(props, emit)

    const containerSize = ref()
    const getContainerSize = () => {
      containerSize.value = props.vertical ? splitPanelsContainer.value?.offsetHeight : splitPanelsContainer.value?.offsetWidth
    }
    onMounted(getContainerSize)
    useResizeObserver([splitPanelsContainer], getContainerSize)

    const convertToPercents = (v: string | number) => {
      let numberValue = ''
      let measureValue = ''

      if (isNumber(v)) { return v }

      v.split('')
        .filter((char) => char)
        .forEach((char) => {
          !isNaN(+char) ? numberValue += char : measureValue += char
        })

      switch (measureValue) {
        case '%':
          return +numberValue
        case 'px':
          return (+numberValue / containerSize.value!) * 100
        case 'rem':
          return ((+numberValue * 16) / containerSize.value!) * 100
        case 'any':
        case '':
          return 100
        default:
          warn('Invalid limits measure!')
          return 0
      }
    }
    const getPanelMinMax = (v: SplitLimit) => {
      if (!v || !containerSize.value) { return }

      let minPercents = 0
      let maxPercents = 100

      if (isString(v) || isNumber(v)) { minPercents = convertToPercents(v) }

      if (Array.isArray(v)) {
        minPercents = convertToPercents(v[0])
        maxPercents = convertToPercents(v[1])
      }

      if (minPercents > maxPercents) {
        warn(`Min panels size can not be larger than max one! Passed limit: ${v}.`)
        maxPercents = minPercents
      }

      return { min: minPercents, max: maxPercents }
    }

    const startPanelMinMax = computed(() => getPanelMinMax(props.limits[0]))
    const endPanelMinMax = computed(() => {
      const result = getPanelMinMax(props.limits[1])

      if (result?.max && startPanelMinMax.value?.max && result.max !== 100 && startPanelMinMax.value.max !== 100) {
        result.max = 100
        warn('One of the panels max size should be equal to 100%!')
      }

      return result
    })

    const splitterPosition = ref(props.modelValue)
    const splitterPositionComputed = computed(() => {
      if (!startPanelMinMax.value || !endPanelMinMax.value) { return splitterPosition.value }

      // checking min panels size
      if (splitterPosition.value < startPanelMinMax.value.min) { return startPanelMinMax.value.min }
      if (splitterPosition.value > 100 - endPanelMinMax.value.min) { return 100 - endPanelMinMax.value.min }

      // checking max panels size
      if (splitterPosition.value > startPanelMinMax.value.max) { return startPanelMinMax.value.max }
      if (splitterPosition.value < 100 - endPanelMinMax.value.max) { return 100 - endPanelMinMax.value.max }

      return splitterPosition.value
    })

    const {
      isDragging,
      startDragging,
      processDragging,
      stopDragging,
      currentSplitterPosition,
    } = useSplitDragger(containerSize, splitterPositionComputed, props)

    const maximizePanel = () => {
      if (!props.maximization || props.disabled || !startPanelMinMax.value || !endPanelMinMax.value) { return }

      splitterPosition.value = props.maximizeStart ? 100 - endPanelMinMax.value.min : startPanelMinMax.value.min
    }

    watch(valueComputed, (v) => {
      if ((startPanelMinMax.value && endPanelMinMax.value) && (v < startPanelMinMax.value.min || v > 100 - endPanelMinMax.value.min)) {
        warn('Incorrect `modelValue`. Check current `limits` prop value.')
      }

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

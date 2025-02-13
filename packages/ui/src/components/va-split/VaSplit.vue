<template>
  <section
    ref="splitPanelsContainer"
    class="va-split"
    :class="classComputed"
    :aria-label="tp($props.ariaLabel)"
  >
    <div
      class="va-split__panel"
      :style="getPanelStyle('start')"
    >
      <slot name="start" v-bind="{ containerSize }" />
    </div>
    <div class="va-split__dragger">
      <div
        class="va-split__dragger__overlay"
        :style="draggerStyleComputed"
        @mousedown.prevent="startDragging"
        @touchstart.prevent="startDragging"
        @dblclick.prevent="maximizePanel"
        @contextmenu.prevent
        @dragstart.prevent
      >
        <slot name="grabber">
          <va-divider
            class="va-split__dragger__default"
            :vertical="!$props.vertical"
          />
        </slot>
      </div>
    </div>
    <div
      class="va-split__panel"
      :style="getPanelStyle('end')"
    >
      <slot name="end" v-bind="{ containerSize }" />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PropType, ref, shallowRef, computed, watch, onMounted } from 'vue'
import { isNumber } from '../../utils/is-number'
import { isString } from '../../utils/is-string'
import { clamp } from '../../utils/clamp'

import {
  useBem,
  useComponentPresetProp,
  useStateful, useStatefulEmits, useStatefulProps,
  useResizeObserver,
  useTranslation, useTranslationProp,
} from '../../composables'
import { useSplitDragger, useSplitDraggerProps } from './useSplitDragger'

import { warn } from '../../utils/console'

import { SplitLimit, SnappingMark } from './types'

import { VaDivider } from '../va-divider'

defineOptions({
  name: 'VaSplit',
})

const props = defineProps({
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
    default: () => [0, 0],
  },
  snapping: {
    type: Array as any as PropType<SnappingMark[]>,
    default: undefined,
  },
  snappingRange: { type: [Number, String] as PropType<number | string>, default: 4 },

  ariaLabel: useTranslationProp('$t:splitPanels'),
})

const emit = defineEmits([...useStatefulEmits])

const splitPanelsContainer = shallowRef<HTMLElement>()

const valueComputed = useStateful(props, emit)

const containerSize = ref()
const bodyFontSize = ref(16)

const handleContainerResize = () => {
  const { width, height } = splitPanelsContainer.value?.getBoundingClientRect() || { width: 0, height: 0 }
  containerSize.value = props.vertical ? height : width
  bodyFontSize.value = parseFloat(getComputedStyle(document.documentElement).fontSize)
}
onMounted(handleContainerResize)
useResizeObserver(splitPanelsContainer, handleContainerResize)

const convertToPercents = (v: string | number, type: 'min' | 'max' | 'snapping') => {
  let numberValue = ''
  let measureValue = ''

  if (isNumber(v)) { return v }

  v.split('')
    .filter((char) => char && char !== ' ')
    .forEach((char) => {
      !isNaN(+char) ? numberValue += char : measureValue += char
    })

  switch (measureValue) {
    case '%':
      return +numberValue
    case 'px':
      return (+numberValue / containerSize.value) * 100
    case 'rem':
      return ((+numberValue * bodyFontSize.value) / containerSize.value) * 100
    case 'any':
      return ['min', 'snapping'].includes(type) ? 0 : 100
    case '':
      return 100
    default:
      warn('Invalid limits measure!')
      return 0
  }
}
const getPanelMinMax = (v: SplitLimit) => {
  if (v === 'undefined' || !containerSize.value) { return }

  let minPercents = 0
  let maxPercents = 100

  if (isString(v) || isNumber(v)) { minPercents = convertToPercents(v, 'min') }

  if (Array.isArray(v)) {
    minPercents = convertToPercents(v[0], 'min')
    maxPercents = convertToPercents(v[1], 'max')
  }

  if (minPercents > maxPercents) {
    warn(`Min panels size can not be larger than max one! Passed limit: ${v}.`)
    maxPercents = minPercents
  }

  return { min: minPercents ?? 0, max: maxPercents ?? 100 }
}

const startPanelMinMax = computed(() => getPanelMinMax(props.limits[0]) ?? { min: 0, max: 100 })
const endPanelMinMax = computed(() => getPanelMinMax(props.limits[1]) ?? { min: 0, max: 100 })

const endPanelMinChecked = computed(() => {
  const passedCheck = !(startPanelMinMax.value.min + endPanelMinMax.value.min > 100)
  if (!passedCheck) {
    warn('The sum of different panels min sizes should be lesser or equal to 100% of the container size!')
  }
  return !passedCheck ? 100 - startPanelMinMax.value.min : endPanelMinMax.value.min
})
const panelsMinMax = computed(() => {
  if (Math.ceil(endPanelMinMax.value.max + startPanelMinMax.value.max) < 100) {
    warn('The sum of different panels max sizes should be equal to 100% of the container size!')
  }

  return {
    start: {
      min: startPanelMinMax.value.min,
      max: Math.min(startPanelMinMax.value.max, 100 - endPanelMinChecked.value),
    },
    end: {
      min: endPanelMinChecked.value,
      max: Math.min(endPanelMinMax.value.max, 100 - startPanelMinMax.value.min),
    },
  }
})

const checkSnappingLimitsCondition = (el: number) =>
  el >= panelsMinMax.value.start.min &&
  el >= panelsMinMax.value.end.min &&
  el <= panelsMinMax.value.start.max &&
  el <= panelsMinMax.value.end.max

const snappingMarksPosition = computed(() => {
  if (!Array.isArray(props.snapping) || !containerSize.value) { return }

  let result = props.snapping.map((el) => convertToPercents(el, 'snapping'))

  if (!result.every(checkSnappingLimitsCondition)) {
    const filteredMarks = result.filter(checkSnappingLimitsCondition)
    warn(`Some of the snapping marks (${result}) are not in allowed range (${Object.values(panelsMinMax.value.start).join('-')} / ${Object.values(panelsMinMax.value.end).join('-')}) and will be removed (${filteredMarks})!`)
    result = filteredMarks
  }

  const checkSnappingRange = () => {
    return result.every((el, index, array) => {
      if (!array[index + 1]) { return true }
      return Math.abs(el - array[index + 1]) > Number(props.snappingRange)
    })
  }

  if (!checkSnappingRange()) {
    warn('Distance between some snapping marks is lesser than snapping range!')
  }

  return result
})

const snappingRangeParsed = computed(() => convertToPercents(props.snappingRange, 'snapping'))

const splitterPosition = ref(valueComputed.value)
const splitterPositionComputed = computed(() => {
  if (snappingMarksPosition.value) {
    const nearestSnappingMark = snappingMarksPosition.value.find((el) => {
      return splitterPosition.value + snappingRangeParsed.value > el && splitterPosition.value - snappingRangeParsed.value < el
    })
    if (nearestSnappingMark) { return nearestSnappingMark }
  }

  return clamp(
    splitterPosition.value,
    Math.max(panelsMinMax.value.start.min, 100 - panelsMinMax.value.end.max),
    Math.min(panelsMinMax.value.start.max, 100 - panelsMinMax.value.end.min),
  )
})

const {
  isDragging,
  startDragging,
  currentSplitterPosition,
} = useSplitDragger(containerSize, splitterPositionComputed, props)

const maximizePanel = () => {
  if (!props.maximization || props.disabled) { return }

  splitterPosition.value = props.maximizeStart ? panelsMinMax.value.start.max : 100 - panelsMinMax.value.end.max
}

watch(valueComputed, (v) => {
  if (v < panelsMinMax.value.start.min || v > 100 - panelsMinMax.value.end.min) {
    warn('Incorrect `modelValue`. Check current `limits` prop value.')
  }

  splitterPosition.value = v
}, { immediate: true })

watch(currentSplitterPosition, (v) => {
  splitterPosition.value = v
})

watch(isDragging, (v) => {
  if (!v) { valueComputed.value = splitterPositionComputed.value }
  document.documentElement.style.cursor = v ? 'var(--va-split-dragging-cursor)' : ''
})

const sizePropertyComputed = computed(() => props.vertical ? 'height' : 'width')
const getPanelStyle = (position: 'start' | 'end') => {
  let sizeValue = position === 'start' ? splitterPositionComputed.value : 100 - splitterPositionComputed.value
  if (sizeValue < 0) { sizeValue = 0 }
  if (sizeValue > 100) { sizeValue = 100 }

  return { [sizePropertyComputed.value]: `${sizeValue}%` }
}

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

const { t, tp } = useTranslation()
</script>

<style lang="scss">
@import 'variables';
@import '../../styles/resources';

.va-split {
  position: relative;
  display: flex;

  &__dragger {
    position: relative;

    &__overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      display: var(--va-split-dragger-display);
      z-index: 1;
    }
  }

  &__panel {
    overflow: var(--va-split-panel-overflow);

    @include va-scroll();
  }

  &--dragging {
    & .va-split__panel {
      user-select: none;
      cursor: var(--va-split-dragging-cursor);
    }
  }

  &__dragger__default {
    opacity: 0.7;
  }

  &:focus,
  &:hover {
    .va-split__dragger__default {
      opacity: 1;
    }
  }

  &--vertical {
    flex-direction: column;

    & > .va-split__dragger {
      height: 0;

      .va-split__dragger__overlay {
        top: calc((var(--va-split-dragger-overlay-size) / -2));
        height: var(--va-split-dragger-overlay-size);
        align-items: var(--va-split-dragger-align-items);
      }

      .va-split__dragger__default {
        width: 100%;
      }
    }
  }

  &--horizontal {
    flex-direction: row;

    & > .va-split__dragger {
      width: 0;

      .va-split__dragger__overlay {
        left: calc((var(--va-split-dragger-overlay-size) / -2));
        width: var(--va-split-dragger-overlay-size);
        justify-content: var(--va-split-dragger-justify-content);
      }

      .va-split__dragger__default {
        height: 100%;
      }
    }
  }
}
</style>

<template>
  <div
    class="va-slider"
    :class="sliderClass"
    v-bind="ariaAttributesComputed"
  >
    <div
      v-if="$slots.prepend"
      class="va-slider__input-wrapper"
      aria-hidden="true"
    >
      <slot name="prepend" />
    </div>
    <span
      v-if="($slots.label || label) && !invertLabel"
      class="va-input__label"
      :id="ariaLabelIdComputed"
      :style="labelStyles"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </span>
    <span
      v-if="iconPrepend"
      class="va-input__label"
      aria-hidden="true"
    >
      <va-icon
        :name="iconPrepend"
        :color="getColor($props.color)"
        :size="16"
      />
    </span>
    <div
      ref="sliderContainer"
      class="va-slider__container"
      @mousedown="clickOnContainer"
      @touchstart="clickOnContainer"
    >
      <div
        class="va-slider__track"
        aria-hidden="true"
        :style="trackStyles"
      />
      <template v-if="pins">
        <div
          v-for="(pin, i) in pinsCol"
          :key="i"
          class="va-slider__mark"
          :class="{ 'va-slider__mark--active': checkActivePin(pin) }"
          :style="getPinStyles(pin)"
        />
      </template>
      <div
        ref="process"
        class="va-slider__track va-slider__track--selected"
        aria-hidden="true"
        :style="processedStyles"
      />
      <button
        v-for="order in orders"
        :key="'dot' + order"
        :ref="setItemRefByIndex(order)"
        class="va-slider__handler"
        :style="getDottedStyles(order)"
        :tabindex="disabled || readonly ? undefined : 0"
        v-bind="sliderAriaAttributes(getValueByOrder(order), order)"
        @focus="currentSliderDotIndex = order"
      >
        <div
          v-if="isActiveDot(order)"
          :style="{ backgroundColor: getColor($props.color) }"
          class="va-slider__handler__dot--focus"
        />
        <div
          v-if="trackLabelVisible"
          :style="labelStyles"
          class="va-slider__handler__dot--value"
        >
          <slot
            name="trackLabel"
            v-bind="{ value: getValueByOrder(order), order }"
          >
            {{ getTrackLabel(getValueByOrder(order), order) }}
          </slot>
        </div>
      </button>
    </div>
    <span
      v-if="iconAppend"
      class="va-input__label--inverse"
      aria-hidden="true"
    >
      <va-icon
        :name="iconAppend"
        :color="getColor($props.color)"
        :size="16"
      />
    </span>
    <span
      v-if="($slots.label || label) && invertLabel"
      class="va-input__label va-input__label--inverse"
      :style="labelStyles"
      :id="ariaLabelIdComputed"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </span>
    <div
      v-if="$slots.append"
      class="va-slider__input-wrapper"
    >
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  watch,
  PropType,
  ref,
  computed,
  onMounted,
  shallowRef,
  CSSProperties,
  WritableComputedRef,
  useSlots, ComputedRef,
} from 'vue'
import {
  useComponentPresetProp,
  useColors,
  useArrayRefs,
  useBem,
  useStateful,
  useStatefulProps,
  useTranslation,
  useTranslationProp,
  useNumericProp,
  useComponentUuid,
  makeNumericProp,
  useEvent,
  useWindow,
} from '../../composables'
import { VaIcon } from '../va-icon'
import { pick } from '../../utils/pick'
import { warn } from '../../utils/console'
import { isDividable } from '../../utils/to-float'

defineOptions({
  name: 'VaSlider',
})

const props = defineProps({
  ...useStatefulProps,
  ...useComponentPresetProp,
  range: { type: Boolean, default: false },
  modelValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0,
    validator: (value: number | number[], { min, max }: { min: number, max: number }) => {
      const inRange = (v: number) => {
        if (v < min) {
          warn(`The value of the slider is ${v}, the minimum value is ${min}, the value of this slider can not be less than the minimum value`)
          return false
        } else if (v > max) {
          warn(`The value of the slider is ${v}, the maximum value is ${max}, the value of this slider can not be greater than the maximum value`)
          return false
        }

        return true
      }

      if (Array.isArray(value)) {
        return value.every(inRange)
      } else {
        return inRange(value)
      }
    },
  },
  trackLabel: ({ type: [Function, String] as PropType<string | ((val: number, order?: number) => string) | undefined> }),
  color: { type: String, default: 'primary' },
  trackColor: { type: String, default: '' },
  labelColor: { type: String, default: '' },
  trackLabelVisible: { type: Boolean, default: false },
  min: makeNumericProp({
    default: 0,
    validator: (val: number, { min, max }) => {
      if (min < max) {
        return true
      }

      warn(`The maximum value (${max}) can not be less than the minimum value (${min}).`)
      return false
    },
  }),
  max: makeNumericProp({
    default: 100,
    validator: (val: number, { min, max }) => {
      if (min < max) {
        return true
      }

      warn(`The maximum value (${max}) can not be less than the minimum value (${min}).`)
      return false
    },
  }),
  step: makeNumericProp({
    default: 1,
    validator: (step: number, { min, max }) => {
      if (!isDividable(max - min, step)) {
        warn(`Step ${step} is illegal. Slider is non-divisible (Min:Max ${min}:${max}).`)
        return false
      }

      return true
    },
  }),
  label: { type: String, default: '' },
  invertLabel: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  pins: { type: Boolean, default: false },
  iconPrepend: { type: String, default: '' },
  iconAppend: { type: String, default: '' },
  vertical: { type: Boolean, default: false },
  showTrack: { type: Boolean, default: true },
  ariaLabel: useTranslationProp('$t:sliderValue'),
  ariaLabelDot: useTranslationProp('$t:sliderDot'),
  ariaLabelMaxDot: useTranslationProp('$t:sliderMaxDot'),
  ariaLabelMinDot: useTranslationProp('$t:sliderMinDot'),
})

const emit = defineEmits(['drag-start', 'drag-end', 'change', 'update:modelValue'])

const { getColor, getHoverColor } = useColors()

const sliderContainer = shallowRef<HTMLElement>()
const dot = shallowRef<HTMLElement>()
const { setItemRefByIndex, itemRefs: dots } = useArrayRefs()

const isMoving = ref(false)
const offset = ref(0)
const size = ref(0)

const defaultValue: number | number[] = props.range ? [0, 100] : 0
const valueComputed: WritableComputedRef<number | number[]> = useStateful(props, emit, 'modelValue', { defaultValue })

const currentSliderDotIndex = ref(0)
const hasMouseDown = ref(false)

const minComputed = useNumericProp('min') as ComputedRef<number>
const maxComputed = useNumericProp('max') as ComputedRef<number>
const stepComputed = useNumericProp('step') as ComputedRef<number>

const orders = computed(() => {
  if (props.range) {
    return props.vertical ? [1, 0] as const : [0, 1] as const
  }

  return [0] as const
})

const pinPositionStyle = computed(() => props.vertical ? 'bottom' : 'left')
const trackSizeStyle = computed(() => props.vertical ? 'height' : 'width')

const moreToLess = computed(() => Array.isArray(val.value) && (val.value[1] - stepComputed.value) < val.value[0])

const lessToMore = computed(() => Array.isArray(val.value) && (val.value[0] + stepComputed.value) > val.value[1])

const sliderClass = useBem('va-slider', () => ({
  ...pick(props, ['disabled', 'readonly', 'vertical']),
  horizontal: !props.vertical,
  grabbing: hasMouseDown.value,
}))

const labelStyles = computed(() => ({
  color: props.labelColor ? getColor(props.labelColor) : getColor(props.color),
}))

const trackStyles = computed(() => ({
  backgroundColor: props.trackColor
    ? getColor(props.trackColor)
    : getHoverColor(getColor(props.color)),
}))

const calculatePercentage = (value: number) => {
  const min = minComputed.value
  const max = maxComputed.value
  return ((clamp(min, value, max) - min) / (max - min)) * 100
}

const processedStyles = computed(() => {
  if (Array.isArray(val.value)) {
    const val0 = calculatePercentage(val.value[0])
    const val1 = calculatePercentage(val.value[1])

    return {
      [pinPositionStyle.value]: `${val0}%`,
      [trackSizeStyle.value]: `${val1 - val0}%`,
      backgroundColor: getColor(props.color),
      visibility: props.showTrack ? 'visible' : 'hidden',
    } as CSSProperties
  } else {
    const val0 = calculatePercentage(val.value)

    return {
      [trackSizeStyle.value]: `${val0 > 100 ? 100 : val0}%`,
      backgroundColor: getColor(props.color),
      visibility: props.showTrack ? 'visible' : 'hidden',
    } as CSSProperties
  }
})

const dottedStyles = computed(() => {
  if (Array.isArray(val.value)) {
    const val0 = calculatePercentage(val.value[0])
    const val1 = calculatePercentage(val.value[1])

    return [
      {
        [pinPositionStyle.value]: `${val0}%`,
      },
      {
        [pinPositionStyle.value]: `${val1}%`,
      },
    ] as CSSProperties[]
  } else {
    const val0 = calculatePercentage(val.value)

    return {
      [pinPositionStyle.value]: `${val0 > 100 ? 100 : val0}%`,
    } as CSSProperties
  }
})

const colorComputed = computed(() => getColor(props.color))

const getDottedStyles = (index: number) => props.range
  ? (dottedStyles.value as CSSProperties[])[index]
  : dottedStyles.value

const val = computed({
  get: () => valueComputed.value,
  set: (val) => {
    if (!isMoving.value) {
      emit('change', val)
    }

    valueComputed.value = val
  },
})

const getValueByOrder = (order?: number) => props.range && order !== undefined
  ? (val.value as number[])[order]
  : val.value as number

const gap = computed(() => {
  const total = (maxComputed.value - minComputed.value) / stepComputed.value

  return size.value / total
})

const multiple = computed(() => {
  const decimals = `${stepComputed.value}`.split('.')[1]

  return decimals ? Math.pow(10, decimals.length) : 1
})

const pinsCol = computed(() => ((maxComputed.value - minComputed.value) / stepComputed.value) - 1)

const position = computed(() => {
  return Array.isArray(val.value)
    ? [(val.value[0] - minComputed.value) / stepComputed.value * gap.value, (val.value[1] - minComputed.value) / stepComputed.value * gap.value]
    : ((val.value - minComputed.value) / stepComputed.value * gap.value)
})

const limit = computed(() => [0, size.value])

const valueLimit = computed(() => [minComputed.value, maxComputed.value])

const isActiveDot = (index: number) => {
  if ((!isMoving.value) || props.disabled || props.readonly) {
    return false
  }

  return props.range ? currentSliderDotIndex.value === index : currentSliderDotIndex.value === 0
}

const moveStart = (e: MouseEvent | TouchEvent, index = currentSliderDotIndex.value) => {
  e.preventDefault() // prevent page scrolling
  if (e.target instanceof HTMLElement) {
    e.target.focus()
  }

  if (!index) {
    if (!props.range) {
      index = 0
    } else if (Array.isArray(position.value)) {
      const touch = 'touches' in e ? e.touches[0] : e
      const pos = getPos(touch)

      index = pos > ((position.value[1] - position.value[0]) / 2 + position.value[0]) ? 1 : 0
    }
  }

  if (Array.isArray(val.value)) {
    currentSliderDotIndex.value = index
  }

  Array.isArray(val.value)
    ? dots.value[index]?.focus()
    : dot.value?.focus()

  isMoving.value = true

  emit('drag-start')
}

const moving = (e: TouchEvent | MouseEvent) => {
  if (!hasMouseDown.value || !isMoving.value || props.disabled || props.readonly) { return }

  e.preventDefault()

  if ('touches' in e) {
    setValueOnPos(getPos(e.touches[0]))
  } else {
    setValueOnPos(getPos(e))
  }
}

const moveEnd = () => {
  if (!props.disabled && !props.readonly) {
    if (isMoving.value) {
      emit('drag-end')
      emit('change', val.value)
    }

    isMoving.value = false
    hasMouseDown.value = false
  }
}

const clamp = (min: number, v: number, max: number) => Math.max(Math.min(v, max), min)

const moveWithKeys = (event: KeyboardEvent) => {
  // don't do anything if a dot isn't focused or if the slider's disabled or readonly
  if (![dots.value[0], dots.value[1], dot.value].includes(document.activeElement as HTMLElement)) {
    return
  }
  if (props.disabled || props.readonly) {
    return
  }

  /*
    where: where to move
      0 - to left
      1 - to right

    which: which dot to move (only makes sense when isRange is true)
      0 - left dot
      1 - right dot
    */
  const moveDot = (where: number, which: number) => {
    if (Array.isArray(val.value)) {
      const value = val.value[which] + (where ? stepComputed.value : -stepComputed.value)
      const limitedValue = clamp(minComputed.value, value, maxComputed.value)
      val.value = [
        which === 0 ? limitedValue : val.value[0],
        which === 1 ? limitedValue : val.value[1],
      ]
    } else {
      const value = val.value + (where ? stepComputed.value : -stepComputed.value)
      const limitedValue = clamp(minComputed.value, value, maxComputed.value)
      val.value = limitedValue
    }
  }

  // prevent page scroll
  if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
    event.preventDefault()
  }

  const isActive = (el?: HTMLElement) => el === document.activeElement

  if (props.range && Array.isArray(val.value)) {
    const isVerticalDot0More = (event: KeyboardEvent) => props.vertical && isActive(dots.value[0]) && event.key === 'ArrowUp'
    const isVerticalDot0Less = (event: KeyboardEvent) => props.vertical && isActive(dots.value[0]) && event.key === 'ArrowDown'
    const isVerticalDot1More = (event: KeyboardEvent) => props.vertical && isActive(dots.value[1]) && event.key === 'ArrowUp'
    const isVerticalDot1Less = (event: KeyboardEvent) => props.vertical && isActive(dots.value[1]) && event.key === 'ArrowDown'
    const isHorizontalDot0Less = (event: KeyboardEvent) => !props.vertical && isActive(dots.value[0]) && event.key === 'ArrowLeft'
    const isHorizontalDot0More = (event: KeyboardEvent) => !props.vertical && isActive(dots.value[0]) && event.key === 'ArrowRight'
    const isHorizontalDot1Less = (event: KeyboardEvent) => !props.vertical && isActive(dots.value[1]) && event.key === 'ArrowLeft'
    const isHorizontalDot1More = (event: KeyboardEvent) => !props.vertical && isActive(dots.value[1]) && event.key === 'ArrowRight'

    switch (true) {
      case (isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && moreToLess.value && val.value[0] !== minComputed.value:
        dots.value[0]?.focus()
        moveDot(0, 0)
        break
      case (isVerticalDot0More(event) || isHorizontalDot0More(event)) && lessToMore.value && val.value[1] !== maxComputed.value:
        dots.value[1]?.focus()
        moveDot(1, 1)
        break
      case (isVerticalDot0Less(event) || isHorizontalDot0Less(event)) && val.value[0] !== minComputed.value:
        moveDot(0, 0)
        break
      case (isVerticalDot1More(event) || isHorizontalDot1More(event)) && val.value[1] !== maxComputed.value:
        moveDot(1, 1)
        break
      case (isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && val.value[1] !== minComputed.value:
        moveDot(0, 1)
        break
      case (isVerticalDot0More(event) || isHorizontalDot0More(event)) && val.value[0] !== maxComputed.value:
        moveDot(1, 0)
        break
      default:
        break
    }
  } else {
    if (props.vertical) {
      if (event.key === 'ArrowDown') {
        moveDot(0, 0)
      }
      if (event.key === 'ArrowUp') {
        moveDot(1, 0)
      }
    } else {
      if (event.key === 'ArrowLeft') {
        moveDot(0, 0)
      }
      if (event.key === 'ArrowRight') {
        moveDot(1, 0)
      }
    }
  }
}

const checkActivePin = (pin: number) => {
  if (Array.isArray(val.value)) {
    return pin * stepComputed.value > val.value[0] && pin * stepComputed.value < val.value[1]
  } else {
    return pin * stepComputed.value < val.value
  }
}

const pinPositionStep = computed(() => stepComputed.value / (maxComputed.value - minComputed.value) * 100)
const getPinStyles = (pin: number) => ({
  backgroundColor: checkActivePin(pin) ? getColor(props.color) : getHoverColor(getColor(props.color)),
  [pinPositionStyle.value]: `${pin * pinPositionStep.value}%`,
  transition: hasMouseDown.value ? 'none' : 'var(--va-slider-pin-transition)',
})

const getPos = (e: MouseEvent | Touch) => {
  getStaticData()

  return props.vertical ? offset.value - e.clientY : e.clientX - offset.value
}

const getStaticData = () => {
  if (sliderContainer.value) {
    size.value = sliderContainer.value[props.vertical ? 'offsetHeight' : 'offsetWidth']

    offset.value = sliderContainer.value.getBoundingClientRect()[pinPositionStyle.value]
  }
}

const getValueByIndex = (index: number) => {
  return ((stepComputed.value * multiple.value) * index + (minComputed.value * multiple.value)) / multiple.value
}

const getTrackLabel = (val: number, order?: number) => {
  if (!props.trackLabel) { return val }

  return typeof props.trackLabel === 'function'
    ? props.trackLabel(val, order)
    : props.trackLabel
}

const setCurrentValue = (newValue: number) => {
  const slider = currentSliderDotIndex.value

  if (Array.isArray(val.value)) {
    if (isDiff(val.value[slider], newValue)) {
      if (slider === 0) {
        val.value = [newValue, val.value[1]]
      } else {
        val.value = [val.value[0], newValue]
      }
    }
  } else {
    if (newValue < minComputed.value) {
      val.value = minComputed.value
    } else if (newValue > maxComputed.value) {
      val.value = maxComputed.value
    } else if (isDiff(val.value, newValue)) {
      val.value = newValue
    }
  }
}

const setValueOnPos = (pixelPosition: number) => {
  const range = limit.value
  const valueRange = valueLimit.value

  // set focus on current thumb
  const dotToFocus = Array.isArray(val.value)
    ? dots.value[currentSliderDotIndex.value]
    : dot.value

  dotToFocus?.focus()

  if (pixelPosition >= range[0] && pixelPosition <= range[1]) {
    const v = getValueByIndex(Math.round(pixelPosition / gap.value))
    if (currentSliderDotIndex.value) {
      if (Array.isArray(position.value) && Array.isArray(val.value) && pixelPosition <= position.value[0]) {
        val.value = [v, val.value[0]]
        currentSliderDotIndex.value = 0
      } else {
        setCurrentValue(v)
      }
    } else {
      if (Array.isArray(position.value) && Array.isArray(val.value) && pixelPosition >= position.value[1]) {
        val.value = [val.value[1], v]
        currentSliderDotIndex.value = 1
      } else {
        setCurrentValue(v)
      }
    }
  } else if (pixelPosition < range[0]) {
    setCurrentValue(valueRange[0])
  } else {
    setCurrentValue(valueRange[1])
  }
}

const isDiff = (a: unknown, b: unknown) => JSON.stringify(a) !== JSON.stringify(b)

const clickOnContainer = (e: MouseEvent | TouchEvent) => {
  if (props.disabled || props.readonly) {
    return
  }

  const pos = ('touches' in e) ? getPos(e.touches[0]) : getPos(e)

  if (Array.isArray(position.value)) {
    currentSliderDotIndex.value = pos > ((position.value[1] - position.value[0]) / 2 + position.value[0]) ? 1 : 0
  }

  hasMouseDown.value = true
  setValueOnPos(pos)
  moveStart(e, currentSliderDotIndex.value)
}

const window = useWindow()
useEvent(['mousemove', 'touchmove'], moving, window)
useEvent(['mouseup', 'mouseleave', 'touchcancel', 'touchend'], moveEnd, window)
useEvent('keydown', moveWithKeys, window)

const componentId = useComponentUuid()
const ariaLabelIdComputed = computed(() => `aria-label-id-${componentId}`)

const { tp } = useTranslation()
const slots = useSlots()

const sliderAriaAttributes = (value: number, order: 0 | 1) => {
  return {
    role: 'slider',
    'aria-valuemin': minComputed.value,
    'aria-valuemax': maxComputed.value,
    'aria-valuenow': value,
    'aria-valuetext': String(value),
    'aria-label': props.range
      ? order === 0
        ? tp(props.ariaLabelMinDot, { value })
        : tp(props.ariaLabelMaxDot, { value })
      : tp(props.ariaLabelDot, { value }),
  }
}

const ariaAttributesComputed = computed(() => ({
  role: 'group',
  'aria-label': !slots.label && !props.label ? tp(props.ariaLabel, { value: String(val.value) }) : undefined,
  'aria-labelledby': slots.label || props.label ? ariaLabelIdComputed.value : undefined,
  'aria-orientation': props.vertical ? 'vertical' as const : 'horizontal' as const,
  'aria-disabled': props.disabled,
  'aria-readonly': props.readonly,
}))

onMounted(() => {
  getStaticData()
})

watch(hasMouseDown, (hasMouseDown) => {
  document.documentElement.style.cursor = hasMouseDown ? 'grabbing' : ''
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-slider {
  display: flex;
  align-items: center;
  font-family: var(--va-font-family);

  &__input-wrapper {
    position: relative;
    display: flex;
  }

  &__container {
    position: relative;
    display: flex;
    align-items: center;
    cursor: grab;
  }

  &__track {
    position: absolute;
    border-radius: var(--va-slider-track-border-radius);
    transition: var(--va-slider-track-transition);
    opacity: var(--va-slider-track-opacity);
  }

  &__track--selected {
    opacity: 1;
  }

  &__handler {
    position: absolute;
    width: var(--va-slider-handler-width);
    height: var(--va-slider-handler-height);
    border: var(--va-slider-handler-border);
    border-radius: var(--va-slider-handler-border-radius);
    outline: var(--va-slider-handler-outline);
    left: var(--va-slider-handler-left);
    transition: all var(--va-slider-handler-transition);
    box-sizing: border-box;
    border-color: v-bind(colorComputed);
    background: var(--va-slider-dot-color-unfocused);

    &:focus {
      background: var(--va-slider-dot-color, v-bind(colorComputed));
      border-color: v-bind(colorComputed);
    }

    &__dot--focus {
      transform: var(--va-slider-dot-transform);
      position: absolute;
      top: 0;
      display: block;
      width: var(--va-slider-dot-width);
      height: var(--va-slider-dot-height);
      border-radius: var(--va-slider-dot-border-radius);
      opacity: var(--va-slider-dot-opacity);
      pointer-events: var(--va-slider-dot-pointer-events);
    }

    &__dot--value {
      transform: var(--va-slider-dot-value-transform);
      user-select: var(--va-slider-dot-value-user-select);
      font-size: var(--va-slider-dot-value-font-size);
      letter-spacing: var(--va-slider-dot-value-letter-spacing);
      line-height: var(--va-slider-dot-value-line-height);
      font-weight: var(--va-slider-dot-value-font-weight);
      text-transform: var(--va-slider-dot-value-text-transform);
      white-space: var(--va-slider-dot-value-white-space);
    }
  }

  .va-input__label {
    user-select: var(--va-slider-input-label-user-select);
    font-size: var(--va-slider-input-label-font-size);
    letter-spacing: var(--va-slider-input-label-letter-spacing);
    line-height: var(--va-slider-input-label-line-height);
    font-weight: var(--va-slider-input-label-font-weight);
    text-transform: var(--va-slider-input-label-text-transform);
  }

  .va-input__label--inverse {
    user-select: var(--va-slider-input-label-inverse-user-select);
    font-size: var(--va-slider-input-label-inverse-font-size);
    letter-spacing: var(--va-slider-input-label-inverse-letter-spacing);
    line-height: var(--va-slider-input-label-inverse-line-height);
    font-weight: var(--va-slider-input-label-inverse-font-weight);
    text-transform: var(--va-slider-input-label-inverse-text-transform);
  }

  &--grabbing {
    --va-slider-track-transition: none;
    --va-slider-handler-transition: none;

    .va-slider__container {
      cursor: grabbing;
    }
  }

  &--disabled {
    @include va-disabled;

    .va-slider__container {
      cursor: default;
    }
  }

  &--readonly {
    .va-slider__container {
      cursor: default;
    }
  }
}

.va-slider--horizontal {
  .va-slider__input-wrapper {
    flex-basis: fit-content;
    flex-grow: 0;
    margin-right: var(--va-slider-horizontal-input-wrapper-margin-right);

    &:last-of-type {
      margin-left: 1rem;
    }
  }

  .va-slider {
    &__container {
      width: 100%;
      height: 1.5rem;
    }

    &__track {
      height: var(--va-slider-horizontal-track-height);
      width: var(--va-slider-horizontal-track-width);
    }

    &__mark {
      position: absolute;
      width: 0.125rem;
      height: 0.75rem;
    }

    &__handler {
      transform: var(--va-slider-horizontal-handler-transform);
      transition: left var(--va-slider-handler-transition);

      &__dot--value {
        position: absolute;
        top: var(--va-slider-horizontal-dot-value-top);
        left: var(--va-slider-horizontal-dot-value-left);
      }
    }
  }

  .va-input__label {
    margin-right: 1rem;
  }

  .va-input__label--inverse {
    margin-left: 1rem;
  }
}

.va-slider--vertical {
  height: var(--va-slider-vertical-height);
  padding: var(--va-slider-vertical-padding);
  flex-direction: var(--va-slider-vertical-flex-direction);
  align-items: var(--va-slider-vertical-align-items);

  .va-input__label {
    margin-bottom: var(--va-slider-vertical-label-margin-bottom);
  }

  .va-input__label--inverse {
    left: var(--va-slider-vertical-label-inverse-left);
    margin-top: var(--va-slider-vertical-label-inverse-margin-top);
  }

  .va-slider {
    &__input-wrapper {
      flex-basis: fit-content;
      flex-grow: 0;
      max-width: var(--va-slider-vertical-input-wrapper-max-width);
      min-width: var(--va-slider-vertical-input-wrapper-min-width);
      position: relative;
      display: flex;

      &:last-of-type {
        margin-top: 1rem;
      }
    }

    &__container {
      height: 100%;
      width: 0.5rem;
    }

    &__track {
      height: var(--va-slider-vertical-track-height);
      width: var(--va-slider-vertical-track-width);
      bottom: var(--va-slider-vertical-track-bottom);
    }

    &__mark {
      position: absolute;
      width: 0.75rem;
      height: 0.125rem;
      left: -2px;
    }

    &__handler {
      transform: var(--va-slider-vertical-handler-transform);
      transition: bottom var(--va-slider-handler-transition);

      &__dot--value {
        position: relative;
        top: var(--va-slider-vertical-dot-value-top);
        left: var(--va-slider-vertical-dot-value-left);
      }
    }
  }
}
</style>

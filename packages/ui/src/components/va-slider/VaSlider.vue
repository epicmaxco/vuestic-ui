<template>
  <div
    class="va-slider"
    :class="sliderClass"
  >
    <div
      class="va-slider__input-wrapper"
      v-if="vertical ? $slots.append : $slots.prepend"
    >
      <slot :name="vertical ? 'append' : 'prepend'" />
    </div>
    <span
      v-if="($slots.label || label) && !invertLabel"
      :style="labelStyles"
      class="va-input__label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </span>
    <span
      v-if="vertical ? iconAppend : iconPrepend"
      class="va-input__label"
    >
      <va-icon
        :name="vertical ? iconAppend : iconPrepend"
        :color="getColor($props.color)"
        :size="16"
      />
    </span>
    <div
      class="va-slider__container"
      ref="sliderContainer"
      @mousedown="clickOnContainer"
      @mouseup="hasMouseDown = false"
    >
      <div
        class="va-slider__track"
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
      <template v-if="isRange">
        <div
          ref="process"
          class="va-slider__track va-slider__track--selected"
          :class="{'va-slider__track--active': isFocused}"
          :style="processedStyles"
          @mousedown="moveStart"
        />
        <div
          v-for="order in orders"
          :key="'dot' + order"
          :ref="'dot' + order"
          class="va-slider__handler"
          :class="dotClass[order]"
          :style="dottedStyles[order]"
          @mousedown="(moveStart($event, order), hasMouseDown = true)"
          @touchstart="moveStart($event, order)"
          @focus="isFocused = true, currentSliderDotIndex = order"
          @blur="isFocused = false"
          :tabindex="disabled || readonly ? undefined : 0"
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
              v-bind="{ value: val[order], order }"
            >
              {{ getTrackLabel(val[order], order) }}
            </slot>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          ref="process"
          class="va-slider__track va-slider__track--selected"
          :class="{'va-slider__track--active': isFocused}"
          :style="processedStyles"
          @mousedown="moveStart($event, 0)"
        />
        <div
          ref="dot"
          class="va-slider__handler"
          :class="dotClass"
          :style="dottedStyles"
          @mousedown="(moveStart($event), hasMouseDown = true)"
          @touchstart="(moveStart($event), hasMouseDown = true)"
          @focus="isFocused = true"
          @blur="isFocused = false"
          :tabindex="$props.disabled || $props.readonly ? undefined : 0"
        >
          <div
            v-if="isActiveDot(0)"
            class="va-slider__handler__dot--focus"
            :style="{ backgroundColor: getColor($props.color) }"
          />
          <div
            v-if="trackLabelVisible"
            :style="labelStyles"
            class="va-slider__handler__dot--value"
          >
            <slot
              name="trackLabel"
              v-bind="{ value: val }"
            >
              {{ getTrackLabel(val) }}
            </slot>
          </div>
        </div>
      </template>
    </div>
    <span
      v-if="vertical ? iconPrepend : iconAppend"
      class="va-input__label--inverse"
    >
      <va-icon
        :name="vertical ? iconPrepend : iconAppend"
        :color="getColor($props.color)"
        :size="16"
      />
    </span>
    <span
      v-if="($slots.label || label) && invertLabel"
      :style="labelStyles"
      class="va-input__label va-input__label--inverse"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </span>
    <div
      class="va-slider__input-wrapper"
      v-if="vertical ? $slots.prepend : $slots.append"
    >
      <slot :name="vertical ? 'prepend' : 'append'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, PropType, ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

import { getHoverColor } from '../../services/color-config/color-functions'
import { validateSlider } from './validateSlider'
import VaIcon from '../va-icon'
import { useColors } from '../../composables/useColor'

export default defineComponent({
  name: 'VaSlider',
  components: { VaIcon },
  emits: ['drag-start', 'drag-end', 'change', 'update:modelValue'],
  props: {
    range: { type: Boolean as PropType<boolean>, default: false },
    modelValue: ({ type: [Number, Array] as PropType<number | number[]>, default: () => [] }),
    trackLabel: ({ type: Function as PropType<((val: any, order?: number) => string) | undefined> }),
    color: { type: String as PropType<string>, default: 'primary' },
    trackColor: { type: String as PropType<string>, default: '' },
    labelColor: { type: String as PropType<string>, default: '' },
    trackLabelVisible: { type: Boolean as PropType<boolean>, default: false },
    min: { type: Number as PropType<number>, default: 0 },
    max: { type: Number as PropType<number>, default: 100 },
    step: { type: Number as PropType<number>, default: 1 },
    label: { type: String as PropType<string>, default: '' },
    invertLabel: { type: Boolean as PropType<boolean>, default: false },
    disabled: { type: Boolean as PropType<boolean>, default: false },
    readonly: { type: Boolean as PropType<boolean>, default: false },
    pins: { type: Boolean as PropType<boolean>, default: false },
    iconPrepend: { type: String as PropType<string>, default: '' },
    iconAppend: { type: String as PropType<string>, default: '' },
    vertical: { type: Boolean as PropType<boolean>, default: false },
    showTrack: { type: Boolean as PropType<boolean>, default: true },
  },
  setup (props, { emit }) {
    const { getColor } = useColors()

    const dot = ref<HTMLElement>()
    const dot0 = ref<HTMLElement>()
    const dot1 = ref<HTMLElement>()
    const sliderContainer = ref<HTMLElement>()

    const isFocused = ref(false)
    const flag = ref(false)
    const offset = ref(0)
    const size = ref(0)
    const currentValue = ref(props.modelValue)
    const currentSliderDotIndex = ref(0)
    const hasMouseDown = ref(false)

    const orders = computed(() => props.vertical ? [1, 0] : [0, 1])

    const pinPositionStyle = computed(() => props.vertical ? 'bottom' : 'left')
    const trackSizeStyle = computed(() => props.vertical ? 'height' : 'width')

    const moreToLess = computed(() => Array.isArray(val.value) && (val.value[1] - props.step) < val.value[0])

    const lessToMore = computed(() => Array.isArray(val.value) && (val.value[0] + props.step) > val.value[1])

    const sliderClass = computed(() => ({
      'va-slider--active': isFocused.value,
      'va-slider--disabled': props.disabled,
      'va-slider--readonly': props.readonly,
      'va-slider--horizontal': !props.vertical,
      'va-slider--vertical': props.vertical,
    }))

    const dotClass = computed(() => {
      if (props.range) {
        return [
          { 'va-slider__handler--inactive': !isFocused.value },
          { 'va-slider__handler--inactive': !isFocused.value },
        ]
      }

      return {
        'va-slider__handler--on-focus': !props.range && (flag.value || isFocused),
        'va-slider__handler--inactive': !isFocused.value,
      }
    })

    const labelStyles = computed(() => ({
      color: props.labelColor ? getColor(props.labelColor) : getColor(props.color),
    }))

    const trackStyles = computed(() => ({
      backgroundColor: props.trackColor
        ? getColor(props.trackColor)
        : getHoverColor(getColor(props.color)),
    }))

    const processedStyles = computed(() => {
      const validatedValue = limitValue(props.modelValue)

      if (Array.isArray(validatedValue)) {
        const val0 = ((validatedValue[0] - props.min) / (props.max - props.min)) * 100
        const val1 = ((validatedValue[1] - props.min) / (props.max - props.min)) * 100

        return {
          [pinPositionStyle.value]: `${val0}%`,
          [trackSizeStyle.value]: `${val1 - val0}%`,
          backgroundColor: getColor(props.color),
          visibility: props.showTrack ? 'visible' : 'hidden',
        }
      } else {
        const val = ((validatedValue - props.min) / (props.max - props.min)) * 100

        return {
          [trackSizeStyle.value]: `${val}%`,
          backgroundColor: getColor(props.color),
          visibility: props.showTrack ? 'visible' : 'hidden',
        }
      }
    })

    const dottedStyles = computed(() => {
      const validatedValue = limitValue(props.modelValue)

      if (Array.isArray(validatedValue)) {
        const val0 = ((validatedValue[0] - props.min) / (props.max - props.min)) * 100
        const val1 = ((validatedValue[1] - props.min) / (props.max - props.min)) * 100

        return [
          {
            [pinPositionStyle.value]: `${val0}%`,
            backgroundColor: isActiveDot(0) ? getColor(props.color) : '#ffffff',
            borderColor: getColor(props.color),
          },
          {
            [pinPositionStyle.value]: `${val1}%`,
            backgroundColor: isActiveDot(1) ? getColor(props.color) : '#ffffff',
            borderColor: getColor(props.color),
          },
        ]
      } else {
        const val = ((validatedValue - props.min) / (props.max - props.min)) * 100

        return {
          [pinPositionStyle.value]: `${val}%`,
          backgroundColor: isActiveDot(0) ? getColor(props.color) : '#ffffff',
          borderColor: getColor(props.color),
        }
      }
    })

    const val = computed({
      get: () => props.modelValue,
      set: (val) => {
        if (!props.range) {
          val = limitValue(val)
        }

        if (!flag.value) {
          emit('change', val)
        }

        emit('update:modelValue', val)
      },
    })

    const gap = computed(() => {
      const total = (props.max - props.min) / props.step

      return size.value / total
    })

    const multiple = computed(() => {
      const decimals = `${props.step}`.split('.')[1]

      return decimals ? Math.pow(10, decimals.length) : 1
    })

    const pinsCol = computed(() => (props.max / props.step) - 1)

    const position = computed(() => {
      return Array.isArray(props.modelValue)
        ? [(props.modelValue[0] - props.min) / props.step * gap.value, (props.modelValue[1] - props.min) / props.step * gap.value]
        : ((props.modelValue - props.min) / props.step * gap.value)
    })

    const limit = computed(() => [0, size.value])

    const valueLimit = computed(() => [props.min, props.max])

    const isActiveDot = (index: number) => {
      if ((!isFocused.value && !flag.value) || props.disabled || props.readonly) {
        return false
      }

      return props.range ? currentSliderDotIndex.value === index : currentSliderDotIndex.value === 0
    }

    const moveStart = (e: MouseEvent | TouchEvent, index = currentSliderDotIndex.value) => {
      if (!index) {
        if (!props.range) {
          index = 0
        } else if (Array.isArray(position.value)) {
          const pos = getPos(e instanceof TouchEvent ? e.touches[0] : e)

          index = pos > ((position.value[1] - position.value[0]) / 2 + position.value[0]) ? 1 : 0
        }
      }

      if (Array.isArray(props.modelValue)) {
        currentSliderDotIndex.value = index
      }

      flag.value = true

      emit('drag-start')
    }

    const moving = (e: TouchEvent | MouseEvent) => {
      if (!hasMouseDown.value || !flag.value || props.disabled || props.readonly) { return }

      if (e instanceof TouchEvent) {
        setValueOnPos(getPos(e.touches[0]))
      } else {
        setValueOnPos(getPos(e))
      }
    }

    const moveEnd = () => {
      if (!props.disabled && !props.readonly) {
        if (flag.value) {
          emit('drag-end')

          emit('change', /* props.range ? Array.from(props.modelValue) : */ props.modelValue)
        } else {
          return false
        }

        flag.value = false
        hasMouseDown.value = false
      }
    }

    const moveWithKeys = (event: KeyboardEvent) => {
      // don't do anything if a dot isn't focused or if the slider's disabled or readonly
      if (![dot0.value, dot1.value, dot.value].includes(document.activeElement as HTMLElement)) {
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
      const moveDot = (isRange: boolean, where: number, which: number) => {
        if (isRange && Array.isArray(val.value)) {
          if (!props.pins) {
            return val.value.splice(which, 1, val.value[which] + (where ? props.step : -props.step))
          }

          // how many value units one pin occupies
          const onePinInterval = (props.max - props.min) / (pinsCol.value + 1)
          // how many full pins are to the left of the dot now
          const fullPinsNow = val.value[which] / onePinInterval | 0
          // the value of the nearest pin
          let nearestPinVal = fullPinsNow * onePinInterval

          if (val.value[which] !== nearestPinVal) { // if the dot's not pinned already
            nearestPinVal += where ? onePinInterval : 0 // take one more pin if moving right
            val.value.splice(which, 1, nearestPinVal)
          } else {
            val.value.splice(which, 1, val.value[which] + (where ? props.step : -props.step))
          }
        } else {
          if (!props.pins && !Array.isArray(val.value)) {
            val.value += where ? props.step : -props.step
            return
          }

          // how many value units one pin occupies
          const onePinInterval = (props.max - props.min) / (pinsCol.value + 1)
          // how many full pins are to the left of the dot now
          const fullPinsNow = !Array.isArray(val.value) ? val.value / onePinInterval | 0 : 0
          // the value of the nearest pin
          let nearestPinVal = fullPinsNow * onePinInterval

          if (val.value !== nearestPinVal) { // if the dot's not pinned already
            nearestPinVal += where ? onePinInterval : 0 // take one more pin if moving right
            val.value = nearestPinVal
          } else {
            val.value += where ? props.step : -props.step
          }
        }
      }

      // prevent page scroll
      if (['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)) {
        event.preventDefault()
      }

      const isActive = (el?: HTMLElement) => el === document.activeElement

      if (props.range && Array.isArray(val.value)) {
        const isVerticalDot0More = (event: KeyboardEvent) => props.vertical && isActive(dot0.value) && event.key === 'ArrowUp'
        const isVerticalDot0Less = (event: KeyboardEvent) => props.vertical && isActive(dot0.value) && event.key === 'ArrowDown'
        const isVerticalDot1More = (event: KeyboardEvent) => props.vertical && isActive(dot1.value) && event.key === 'ArrowUp'
        const isVerticalDot1Less = (event: KeyboardEvent) => props.vertical && isActive(dot1.value) && event.key === 'ArrowDown'
        const isHorizontalDot0Less = (event: KeyboardEvent) => !props.vertical && isActive(dot0.value) && event.key === 'ArrowLeft'
        const isHorizontalDot0More = (event: KeyboardEvent) => !props.vertical && isActive(dot0.value) && event.key === 'ArrowRight'
        const isHorizontalDot1Less = (event: KeyboardEvent) => !props.vertical && isActive(dot1.value) && event.key === 'ArrowLeft'
        const isHorizontalDot1More = (event: KeyboardEvent) => !props.vertical && isActive(dot1.value) && event.key === 'ArrowRight'

        switch (true) {
          case (isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && moreToLess.value && val.value[0] !== props.min:
            dot0.value?.focus()
            moveDot(true, 0, 0)
            break
          case (isVerticalDot0More(event) || isHorizontalDot0More(event)) && lessToMore.value && val.value[1] !== props.max:
            dot0.value?.focus()
            moveDot(true, 1, 1)
            break
          case (isVerticalDot0Less(event) || isHorizontalDot0Less(event)) && val.value[0] !== props.min:
            moveDot(true, 0, 0)
            break
          case (isVerticalDot1More(event) || isHorizontalDot1More(event)) && val.value[1] !== props.max:
            moveDot(true, 1, 1)
            break
          case (isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && val.value[1] !== props.min:
            moveDot(true, 0, 1)
            break
          case (isVerticalDot0More(event) || isHorizontalDot0More(event)) && val.value[0] !== props.max:
            moveDot(true, 1, 0)
            break
          default:
            break
        }
      } else {
        if (props.vertical) {
          if (event.key === 'ArrowDown') {
            moveDot(false, 0, 0)
          }
          if (event.key === 'ArrowUp') {
            moveDot(false, 1, 0)
          }
        } else {
          if (event.key === 'ArrowLeft') {
            moveDot(false, 0, 0)
          }
          if (event.key === 'ArrowRight') {
            moveDot(false, 1, 0)
          }
        }
      }
    }

    const checkActivePin = (pin: number) => {
      if (Array.isArray(val.value)) {
        return pin * props.step > val.value[0] && pin * props.step < val.value[1]
      } else {
        return pin * props.step < val.value
      }
    }

    const getPinStyles = (pin: number) => ({
      backgroundColor: checkActivePin(pin) ? getColor(props.color) : getHoverColor(getColor(props.color)),
      [pinPositionStyle.value]: `${pin * props.step}%`,
      transition: hasMouseDown.value ? 'none' : 'background-color .3s ease-out .1s',
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
      return ((props.step * multiple.value) * index + (props.min * multiple.value)) / multiple.value
    }

    const getTrackLabel = (val: number, order?: number) => {
      if (!props.trackLabel) { return val }

      if (typeof props.trackLabel === 'function') {
        return props.trackLabel(val, order)
      }
    }

    const setCurrentValue = (newValue: number) => {
      const slider = currentSliderDotIndex.value

      if (Array.isArray(val.value) && Array.isArray(currentValue.value) && Array.isArray(props.modelValue)) {
        if (isDiff(currentValue.value[slider], newValue)) {
          currentValue.value.splice(slider, 1, newValue)
          if (slider === 0) {
            val.value = [currentValue.value.splice(slider, 1, newValue)[0], props.modelValue[1]]
            currentValue.value = [...val.value]
          } else {
            val.value = [props.modelValue[0], currentValue.value.splice(slider, 1, newValue)[0]]
            currentValue.value = [...val.value]
          }
        }
      } else {
        if (newValue < props.min || newValue > props.max) {
          return false
        }
        if (isDiff(currentValue.value, newValue)) {
          currentValue.value = newValue
          val.value = newValue
        }
      }
    }

    const setValueOnPos = (pixelPosition: number) => {
      const range = limit.value
      const valueRange = valueLimit.value

      // set focus on current thumb
      const dotToFocus = Array.isArray(props.modelValue) ? (currentSliderDotIndex.value ? dot1.value : dot0.value) : dot.value

      dotToFocus?.focus()

      if (pixelPosition >= range[0] && pixelPosition <= range[1]) {
        if (currentSliderDotIndex.value) {
          if (Array.isArray(position.value) && Array.isArray(val.value) && pixelPosition <= position.value[0]) {
            val.value[1] = val.value[0]
            currentSliderDotIndex.value = 0
          }
          const v = getValueByIndex(Math.round(pixelPosition / gap.value))
          setCurrentValue(v)
        } else {
          if (Array.isArray(position.value) && Array.isArray(val.value) && pixelPosition >= position.value[1]) {
            val.value[0] = val.value[1]
            currentSliderDotIndex.value = 1
          }
          const v = getValueByIndex(Math.round(pixelPosition / gap.value))
          setCurrentValue(v)
        }
      } else if (pixelPosition < range[0]) {
        setCurrentValue(valueRange[0])
      } else {
        setCurrentValue(valueRange[1])
      }
    }

    const limitValue = (val: number | number[]) => {
      const inRange = (v: number) => {
        if (v < props.min) {
          return props.min
        } else if (v > props.max) {
          return props.max
        }
        return v
      }

      if (Array.isArray(val)) {
        if (val[0] >= val[1] && currentSliderDotIndex.value === 0) {
          const v = inRange(val[1])
          return [v, v]
        }
        if (val[0] >= val[1] && currentSliderDotIndex.value === 1) {
          const v = inRange(val[0])
          return [v, v]
        }
        return val.map((v) => inRange(v))
      } else {
        return inRange(val)
      }
    }

    const isDiff = (a: unknown, b: unknown) => JSON.stringify(a) !== JSON.stringify(b)

    const clickOnContainer = (e: MouseEvent) => {
      if (props.disabled || props.readonly) {
        return
      }
      const pos = getPos(e)
      if (Array.isArray(position.value)) {
        currentSliderDotIndex.value = pos > ((position.value[1] - position.value[0]) / 2 + position.value[0]) ? 1 : 0
      }
      hasMouseDown.value = true
      setValueOnPos(pos)
      moveStart(e, currentSliderDotIndex.value)
    }

    const bindEvents = () => {
      document.addEventListener('mousemove', moving)
      document.addEventListener('touchmove', moving)
      document.addEventListener('mouseup', moveEnd)
      document.addEventListener('mouseleave', moveEnd)
      document.addEventListener('touchcancel', moveEnd)
      document.addEventListener('touchend', moveEnd)
      document.addEventListener('keydown', moveWithKeys)
    }

    const unbindEvents = () => {
      document.removeEventListener('mousemove', moving)
      document.removeEventListener('touchmove', moving)
      document.removeEventListener('mouseup', moveEnd)
      document.removeEventListener('mouseleave', moveEnd)
      document.removeEventListener('touchcancel', moveEnd)
      document.removeEventListener('touchend', moveEnd)
      document.removeEventListener('keydown', moveWithKeys)
    }

    onMounted(() => {
      if (validateSlider(props.modelValue, props.step, props.min, props.max)) {
        getStaticData()
        bindEvents()
      }
    })

    onBeforeUnmount(unbindEvents)

    watch([
      val,
      () => props.step,
      () => props.min,
      () => props.max,
    ], ([value, step, min, max]) => {
      validateSlider(value, step, min, max)
    })

    watch(hasMouseDown, (hasMouseDown) => {
      document.documentElement.style.cursor = hasMouseDown ? 'grabbing' : ''
    })

    return {
      getColor,
      dot,
      dot0,
      dot1,
      orders,
      sliderContainer,
      val,
      sliderClass,
      dotClass,
      labelStyles,
      processedStyles,
      getPinStyles,
      dottedStyles,
      clickOnContainer,
      moveStart,
      hasMouseDown,
      trackStyles,
      pinsCol,
      checkActivePin,
      isFocused,
      isActiveDot,
      getTrackLabel,
      currentSliderDotIndex,
      isRange: Array.isArray(props.modelValue),
    }
  },
})
</script>

<style lang='scss'>
@import "../../styles/resources";
@import "variables";

.va-slider {
  display: var(--va-slider-display);
  align-items: var(--va-slider-align-items);
  font-family: var(--va-font-family);

  &__input-wrapper {
    position: var(--va-slider-input-wrapper-position);
    display: var(--va-slider-input-wrapper-display);
  }

  &__container {
    position: relative;
    display: flex;
    align-items: center;
    cursor: grab;
  }

  &__track {
    position: var(--va-slider-track-position);
    border-radius: var(--va-slider-track-border-radius);
    transition: var(--va-slider-track-transition);
    opacity: var(--va-slider-track-opacity);

    &--active {
      transition: 0s;
    }
  }

  &__track--selected {
    opacity: 1;
  }

  &__handler {
    position: var(--va-slider-handler-position);
    width: var(--va-slider-handler-width);
    height: var(--va-slider-handler-height);
    background: var(--va-slider-handler-background);
    border: var(--va-slider-handler-border);
    border-radius: var(--va-slider-handler-border-radius);
    outline: var(--va-slider-handler-outline);
    left: var(--va-slider-handler-left);
    transition: var(--va-slider-handler-transition);

    &__dot--focus {
      transform: var(--va-slider-dot-transform);
      display: var(--va-slider-dot-display);
      width: var(--va-slider-dot-width);
      height: var(--va-slider-dot-height);
      position: var(--va-slider-dot-position);
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

  &--active {
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
    flex-basis: var(--va-slider-horizontal-input-wrapper-flex-basis);
    flex-grow: var(--va-slider-horizontal-input-wrapper-flex-grow);
    max-width: var(--va-slider-horizontal-input-wrapper-max-width);
    margin-right: var(--va-slider-horizontal-input-wrapper-margin-right);
    min-width: var(--va-slider-horizontal-input-wrapper-min-width);

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

      &--inactive {
        transition: left 0.5s ease-out;
      }

      &__dot--value {
        position: var(--va-slider-horizontal-dot-value-position);
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
      flex-basis: var(--va-slider-vertical-input-wrapper-flex-basis);
      flex-grow: var(--va-slider-vertical-input-wrapper-flex-grow);
      max-width: var(--va-slider-vertical-input-wrapper-max-width);
      min-width: var(--va-slider-vertical-input-wrapper-min-width);
      position: var(--va-slider-vertical-input-wrapper-position);
      display: var(--va-slider-vertical-input-wrapper-display);

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

      &--inactive {
        transition: bottom 0.5s ease-out;
      }

      &__dot--value {
        position: var(--va-slider-vertical-dot-value-position);
        top: var(--va-slider-vertical-dot-value-top);
        left: var(--va-slider-vertical-dot-value-left);
      }
    }
  }
}
</style>

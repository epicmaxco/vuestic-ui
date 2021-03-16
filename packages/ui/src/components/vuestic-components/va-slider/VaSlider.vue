<template>
  <div
    class="va-slider"
    :class="sliderClass"
  >
    <div
      class="va-slider__input-wrapper"
      v-if="$slots.prepend"
    >
      <slot :name="this.vertical ? 'append' : 'prepend'" />
    </div>
    <slot
      v-if="($slots.label || label) && !invertLabel"
      name="label"
    >
      <span
        :style="labelStyles"
        class="va-input__label"
      >
        {{ label }}
      </span>
    </slot>
    <span
      v-if="iconPrepend"
      class="va-input__label"
    >
      <va-icon
        :name="iconPrepend"
        :color="colorComputed"
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
          v-for="(pin, key) in pinsCol"
          :key="key"
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
          @mousedown="moveStart($event, null)"
        />
        <div
          v-for="order in (this.vertical ? [1, 0] : [0, 1])"
          :key="'dot' + order"
          :ref="'dot' + order"
          class="va-slider__handler"
          :class="dotClass[order]"
          :style="dottedStyles[order]"
          @mousedown="(moveStart($event, order), setMouseDown($event, order + 1))"
          @touchstart="moveStart($event, order)"
          @focus="isFocused = true, currentSliderDotIndex = order"
          @blur="isFocused = false"
          :tabindex="(!disabled && !readonly) && 0"
        >
          <div
            v-if="isActiveDot(order)"
            :style="{ backgroundColor: colorComputed }"
            class="va-slider__handler__dot--focus"
          />
          <div
            v-if="trackLabelVisible"
            :style="labelStyles"
            class="va-slider__handler__dot--value"
          >
            {{ val[order] }}
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
          @mousedown="(moveStart($event), setMouseDown($event))"
          @touchstart="(moveStart($event), setMouseDown($event))"
          @focus="isFocused = true"
          @blur="isFocused = false"
          :tabindex="(!this.disabled && !this.readonly) && 0"
        >
          <div
            v-if="isActiveDot(0)"
            class="va-slider__handler__dot--focus"
            :style="{ backgroundColor: colorComputed }"
          />
          <div
            v-if="trackLabelVisible"
            :style="labelStyles"
            class="va-slider__handler__dot--value"
          >
            {{ trackLabel || val }}
          </div>
        </div>
      </template>
    </div>
    <span
      v-if="iconAppend"
      class="va-input__label--inverse"
    >
      <va-icon
        :name="iconAppend"
        :color="colorComputed"
        :size="16"
      />
    </span>
    <slot
      v-if="invertLabel"
      name="label"
    >
      <span
        v-if="invertLabel"
        :style="labelStyles"
        class="va-input__label va-input__label--inverse"
      >
        {{ label }}
      </span>
    </slot>
    <div
      class="va-slider__input-wrapper"
      v-if="$slots.append"
    >
      <slot :name=" this.vertical ? 'prepend' : 'append'" />
    </div>
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'
import { Options, mixins, Vue, prop, setup } from 'vue-class-component'

import { Ref } from '../../../utils/decorators'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { getHoverColor } from '../../../services/color-config/color-functions'
import { validateSlider } from './validateSlider'
import VaIcon from '../va-icon'

class SliderProps {
  range = prop<boolean>({ type: Boolean, default: false })
  modelValue = prop<number | number[]>({ type: [Number, Array], default: () => [] })
  trackLabel = prop<string>({ type: String, default: '' })
  color = prop<string>({ type: String, default: '' })
  trackColor = prop<string>({ type: String, default: '' })
  labelColor = prop<string>({ type: String, default: '' })
  trackLabelVisible = prop<boolean>({ type: Boolean, default: false })
  min = prop<number>({ type: Number, default: 0 })
  max = prop<number>({ type: Number, default: 100 })
  step = prop<number>({ type: Number, default: 1 })
  label = prop<string>({ type: String, default: '' })
  invertLabel = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean, default: false })
  readonly = prop<boolean>({ type: Boolean, default: false })
  pins = prop<boolean>({ type: Boolean, default: false })
  iconPrepend = prop<string>({ type: String, default: '' })
  iconAppend = prop<string>({ type: String, default: '' })
  vertical = prop<boolean>({ type: Boolean, default: false })
  showTrack = prop<boolean>({ type: Boolean, default: true })
}

const SliderPropsMixin = Vue.with(SliderProps)

@Options({
  name: 'VaSlider',
  components: { VaIcon },
  emits: ['drag-start', 'drag-end', 'change', 'update:modelValue'],
})
export default class VaSlider extends mixins(
  ColorMixin,
  SliderPropsMixin,
) {
  @Ref('dot') readonly dot!: HTMLElement
  @Ref('dot0') readonly dot0!: HTMLElement
  @Ref('dot1') readonly dot1!: HTMLElement
  @Ref('sliderContainer') readonly sliderContainer!: HTMLElement

  isFocused = false
  flag = false
  size = 0
  currentValue = this.modelValue
  currentSliderDotIndex = 0
  isComponentExists = false
  hasMouseDown = false

  context = setup(() => {
    watch([
      () => this.val,
      () => this.$props.step,
      () => this.$props.min,
      () => this.$props.max,
    ], ([value, step, min, max]) => {
      // @ts-ignore
      validateSlider(value, step, min, max)
    })

    watch(() => this.hasMouseDown, (hasMouseDown) => {
      if (hasMouseDown) {
        document.documentElement.style.cursor = 'grabbing'
      } else {
        document.documentElement.style.cursor = ''
      }
    })

    return {}
  })

  get pinPositionStyle (): 'bottom' | 'left' {
    return this.vertical ? 'bottom' : 'left'
  }

  get trackSizeStyle (): 'height' | 'width' {
    return this.vertical ? 'height' : 'width'
  }

  get moreToLess () {
    // @ts-ignore
    return this.val[1] - this.step < this.val[0]
  }

  get lessToMore () {
    // @ts-ignore
    return this.val[0] + this.step > this.val[1]
  }

  get sliderClass () {
    return {
      'va-slider--active': this.isFocused,
      'va-slider--disabled': this.disabled,
      'va-slider--readonly': this.readonly,
      'va-slider--horizontal': !this.vertical,
      'va-slider--vertical': this.vertical,
    }
  }

  get dotClass () {
    if (this.range) {
      return [
        { 'va-slider__handler--inactive': !this.isFocused },
        { 'va-slider__handler--inactive': !this.isFocused },
      ]
    }

    return {
      'va-slider__handler--on-focus': !this.range && (this.flag || this.isFocused),
      'va-slider__handler--inactive': !this.isFocused,
    }
  }

  get labelStyles () {
    return {
      color: this.labelColor ? this.computeColor(this.labelColor) : this.colorComputed,
    }
  }

  get trackStyles () {
    return {
      backgroundColor: this.trackColor
        ? this.computeColor(this.trackColor)
        : getHoverColor(this.colorComputed),
    }
  }

  get processedStyles () {
    const validatedValue = this.limitValue(this.modelValue)

    if (this.range) {
      const val0 = ((validatedValue[0] - this.min) / (this.max - this.min)) * 100
      const val1 = ((validatedValue[1] - this.min) / (this.max - this.min)) * 100

      return {
        [this.pinPositionStyle]: `${val0}%`,
        [this.trackSizeStyle]: `${val1 - val0}%`,
        backgroundColor: this.colorComputed,
        visibility: this.showTrack ? 'visible' : 'hidden',
      }
    } else {
      const val = ((validatedValue - this.min) / (this.max - this.min)) * 100

      return {
        [this.trackSizeStyle]: `${val}%`,
        backgroundColor: this.colorComputed,
        visibility: this.showTrack ? 'visible' : 'hidden',
      }
    }
  }

  get dottedStyles () {
    const validatedValue = this.limitValue(this.modelValue)

    if (this.range) {
      const val0 = ((validatedValue[0] - this.min) / (this.max - this.min)) * 100
      const val1 = ((validatedValue[1] - this.min) / (this.max - this.min)) * 100

      return [
        {
          [this.pinPositionStyle]: `${val0}%`,
          backgroundColor: this.isActiveDot(0) ? this.colorComputed : '#ffffff',
          borderColor: this.colorComputed,
        },
        {
          [this.pinPositionStyle]: `${val1}%`,
          backgroundColor: this.isActiveDot(1) ? this.colorComputed : '#ffffff',
          borderColor: this.colorComputed,
        },
      ]
    } else {
      const val = ((validatedValue - this.min) / (this.max - this.min)) * 100

      return {
        [this.pinPositionStyle]: `${val}%`,
        backgroundColor: this.isActiveDot(0) ? this.colorComputed : '#ffffff',
        borderColor: this.colorComputed,
      }
    }
  }

  get val () {
    return this.$props.modelValue
  }

  set val (val) {
    if (!this.range) {
      val = this.limitValue(val)
    }
    if (!this.flag) {
      this.$emit('change', val)
    }
    this.$emit('update:modelValue', val)
  }

  get total () {
    return (this.max - this.min) / this.step
  }

  get gap () {
    return this.size / this.total
  }

  get multiple () {
    const decimals = `${this.step}`.split('.')[1]
    return decimals ? Math.pow(10, decimals.length) : 1
  }

  get interval () {
    // @ts-ignore
    return this.modelValue[1] - this.modelValue[0]
  }

  get pinsCol () {
    return (this.max / this.step) - 1
  }

  get position (): any {
    // @ts-ignore
    return this.isRange ? [(this.modelValue[0] - this.min) / this.step * this.gap, (this.modelValue[1] - this.min) / this.step * this.gap] : ((this.modelValue - this.min) / this.step * this.gap)
  }

  get limit () {
    return [0, this.size]
  }

  get valueLimit () {
    return [this.min, this.max]
  }

  get isRange () {
    return Array.isArray(this.modelValue)
  }

  get propsForValidation () {
    return {
      value: this.val,
      step: this.step,
      min: this.min,
      max: this.max,
    }
  }

  bindEvents () {
    document.addEventListener('mousemove', this.moving)
    document.addEventListener('touchmove', this.moving)
    document.addEventListener('mouseup', this.moveEnd)
    document.addEventListener('mouseleave', this.moveEnd)
    document.addEventListener('touchcancel', this.moveEnd)
    document.addEventListener('touchend', this.moveEnd)
    document.addEventListener('keydown', this.moveWithKeys)
  }

  unbindEvents () {
    document.removeEventListener('mousemove', this.moving)
    document.removeEventListener('touchmove', this.moving)
    document.removeEventListener('mouseup', this.moveEnd)
    document.removeEventListener('mouseleave', this.moveEnd)
    document.removeEventListener('touchcancel', this.moveEnd)
    document.removeEventListener('touchend', this.moveEnd)
    document.removeEventListener('keydown', this.moveWithKeys)
  }

  isActiveDot (index: number) {
    if ((!this.isFocused && !this.flag) || this.disabled || this.readonly) {
      return false
    }

    return this.range ? this.currentSliderDotIndex === index : this.currentSliderDotIndex === 0
  }

  setMouseDown (e: Event, index: number = this.currentSliderDotIndex) {
    if (!this.readonly && !this.disabled) {
      this.hasMouseDown = Boolean(index) || true
    }
  }

  moveStart (e: Event, index: number = this.currentSliderDotIndex) {
    if (!index) {
      if (!this.range) {
        index = 0
      } else {
        const pos = this.getPos(e)
        index = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
      }
    }

    if (this.isRange) {
      this.currentSliderDotIndex = index
    }

    this.flag = true
    this.$emit('drag-start')
  }

  moving (e: any) {
    if (!this.hasMouseDown) { return }
    if (!this.disabled && !this.readonly) {
      if (!this.flag) {
        return false
      }

      if (e.type === 'touchmove') {
        this.setValueOnPos(this.getPos(e.touches[0]))
      } else {
        e.preventDefault()
        this.setValueOnPos(this.getPos(e))
      }
    }
  }

  moveEnd () {
    if (!this.disabled && !this.readonly) {
      if (this.flag) {
        this.$emit('drag-end')
        // @ts-ignore
        this.$emit('change', this.range ? Array.from(this.modelValue) : this.modelValue)
      } else {
        return false
      }
      this.flag = false
      this.hasMouseDown = false
    }
  }

  moveWithKeys (event: any) {
    // don't do anything if a dot isn't focused or if the slider's disabled or readonly
    // @ts-ignore
    if (![this.dot0, this.dot1, this.dot].includes(document.activeElement as any)) { return }
    if (this.disabled || this.readonly) { return }

    /*
      where: where to move
        0 - to left
        1 - to right

      which: which dot to move (only makes sense when isRange is true)
        0 - left dot
        1 - right dot
      */
    const moveDot = (isRange: boolean, where: number, which: number) => {
      if (isRange) {
        // @ts-ignore
        if (!this.pins) { return this.val.splice(which, 1, this.val[which] + (where ? this.step : -this.step)) }

        // how many value units one pin occupies
        const onePinInterval = (this.max - this.min) / (this.pinsCol + 1)
        // how many full pins are to the left of the dot now
        // @ts-ignore
        const fullPinsNow = this.val[which] / onePinInterval | 0
        // the value of the nearest pin
        let nearestPinVal = fullPinsNow * onePinInterval

        // @ts-ignore
        if (this.val[which] !== nearestPinVal) { // if the dot's not pinned already
          nearestPinVal += where ? onePinInterval : 0 // take one more pin if moving right
          // @ts-ignore
          this.val.splice(which, 1, nearestPinVal)
        } else {
          // @ts-ignore
          this.val.splice(which, 1, this.val[which] + (where ? this.step : -this.step))
        }
      } else {
        if (!this.pins) {
          // @ts-ignore
          this.val += where ? this.step : -this.step
          return
        }

        // how many value units one pin occupies
        const onePinInterval = (this.max - this.min) / (this.pinsCol + 1)
        // how many full pins are to the left of the dot now
        // @ts-ignore
        const fullPinsNow = this.val / onePinInterval | 0
        // the value of the nearest pin
        let nearestPinVal = fullPinsNow * onePinInterval

        if (this.val !== nearestPinVal) { // if the dot's not pinned already
          nearestPinVal += where ? onePinInterval : 0 // take one more pin if moving right
          this.val = nearestPinVal
        } else {
          this.val += where ? this.step : -this.step
        }
      }
    }

    const arrowKeyCodes = [37, 38, 39, 40] // LEFT, UP, RIGHT, DOWN
    const [CODE_LEFT, CODE_UP, CODE_RIGHT, CODE_DOWN] = arrowKeyCodes
    // prevent page scroll
    if (arrowKeyCodes.indexOf(event.keyCode) !== -1) {
      event.preventDefault()
    }

    if (this.range) {
      const isVerticalDot0More = (event: any) =>
        this.vertical && this.dot0 === document.activeElement && event.keyCode === CODE_UP
      const isVerticalDot0Less = (event: any) => this.vertical && this.dot0 === document.activeElement && event.keyCode === CODE_DOWN
      const isVerticalDot1More = (event: any) => this.vertical && this.dot1 === document.activeElement && event.keyCode === CODE_UP
      const isVerticalDot1Less = (event: any) => this.vertical && this.dot1 === document.activeElement && event.keyCode === CODE_DOWN
      const isHorizontalDot0Less = (event: any) =>
        !this.vertical && this.dot0 === document.activeElement && event.keyCode === CODE_LEFT
      const isHorizontalDot0More = (event: any) =>
        !this.vertical && this.dot0 === document.activeElement && event.keyCode === CODE_RIGHT
      const isHorizontalDot1Less = (event: any) =>
        !this.vertical && this.dot1 === document.activeElement && event.keyCode === CODE_LEFT
      const isHorizontalDot1More = (event: any) =>
        !this.vertical && this.dot1 === document.activeElement && event.keyCode === CODE_RIGHT

      switch (true) {
        // @ts-ignore
      case (isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && this.moreToLess && this.val[0] !== this.min:
        // @ts-ignore
        this.dot0.focus()
        moveDot(true, 0, 0)
        break
        // @ts-ignore
      case (isVerticalDot0More(event) || isHorizontalDot0More(event)) && this.lessToMore && this.val[1] !== this.max:
        // @ts-ignore
        this.dot0.focus()
        moveDot(true, 1, 1)
        break
        // @ts-ignore
      case (isVerticalDot0Less(event) || isHorizontalDot0Less(event)) && this.val[0] !== this.min:
        moveDot(true, 0, 0)
        break
        // @ts-ignore
      case (isVerticalDot1More(event) || isHorizontalDot1More(event)) && this.val[1] !== this.max:
        moveDot(true, 1, 1)
        break
        // @ts-ignore
      case (isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && this.val[1] !== this.min:
        moveDot(true, 0, 1)
        break
        // @ts-ignore
      case (isVerticalDot0More(event) || isHorizontalDot0More(event)) && this.val[0] !== this.max:
        moveDot(true, 1, 0)
        break
      default:
        break
      }
    } else {
      if (this.vertical) {
        if (event.keyCode === CODE_DOWN) { moveDot(false, 0, 0) }
        if (event.keyCode === CODE_UP) { moveDot(false, 1, 0) }
      } else {
        if (event.keyCode === CODE_LEFT) { moveDot(false, 0, 0) }
        if (event.keyCode === CODE_RIGHT) { moveDot(false, 1, 0) }
      }
    }
  }
  // wrapClick (e) {
  //   if (!this.disabled && !this.readonly && !this.flag) {
  //     const pos = this.getPos(e)
  //     if (this.isRange) {
  //       this.currentSliderDotIndex = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
  //     }
  //     this.setValueOnPos(pos)
  //     if (this.pins) {
  //       if (this.isRange) {
  //         if (this.currentValue[0] % this.step !== 0) {
  //           this.currentValue[0] = this.normalizeValue(this.currentValue[0])
  //           this.val = [this.currentValue[0], this.val[1]]
  //         }
  //         if (this.currentValue[1] % this.step !== 0) {
  //           this.currentValue[1] = this.normalizeValue(this.currentValue[1])
  //           this.val = [this.val[0], this.currentValue[1]]
  //         }
  //       } else {
  //         this.currentValue = this.normalizeValue(this.currentValue)
  //         this.val = this.currentValue
  //       }
  //     }
  //   }
  // },

  checkActivePin (pin: number) {
    if (this.isRange) {
      // @ts-ignore
      return pin * this.step > this.val[0] && pin * this.step < this.val[1]
    } else {
      // @ts-ignore
      return pin * this.step < this.val
    }
  }

  getPinStyles (pin: number) {
    return {
      backgroundColor: this.checkActivePin(pin) ? this.colorComputed : getHoverColor(this.colorComputed),
      [this.pinPositionStyle]: `${pin * this.step}%`,
      transition: this.hasMouseDown ? 'none' : 'background-color .3s ease-out .1s',
    }
  }

  getPos (e: any) {
    this.getStaticData()
    // @ts-ignore
    return this.vertical ? this.offset - e.clientY : e.clientX - this.offset
  }

  getStaticData () {
    if (this.sliderContainer) {
      this.size = this.sliderContainer[this.vertical ? 'offsetHeight' : 'offsetWidth']
      // @ts-ignore
      this.offset = (this.sliderContainer.getBoundingClientRect() as Record<string, any>)[this.pinPositionStyle]
    }
  }

  getValueByIndex (index: number) {
    return ((this.step * this.multiple) * index + (this.min * this.multiple)) / this.multiple
  }

  setCurrentValue (val: any) {
    const slider = this.currentSliderDotIndex
    if (this.isRange) {
      // @ts-ignore
      if (this.isDiff(this.currentValue[slider], val)) {
        // @ts-ignore
        this.currentValue.splice(slider, 1, val)
        if (slider === 0) {
          // @ts-ignore
          this.val = [this.currentValue.splice(slider, 1, val)[0], this.modelValue[1]]
          this.currentValue = [...this.val]
        } else {
          // @ts-ignore
          this.val = [this.modelValue[0], this.currentValue.splice(slider, 1, val)[0]]
          this.currentValue = [...this.val]
        }
      }
    } else {
      if (val < this.min || val > this.max) {
        return false
      }
      if (this.isDiff(this.currentValue, val)) {
        this.currentValue = val
        this.val = val
      }
    }
  }

  setValueOnPos (pixelPosition: any) {
    const range = this.limit
    const valueRange = this.valueLimit

    // this.setTransform()

    // set focus on current thumb
    const dotToFocus = this.isRange ? (this.currentSliderDotIndex ? this.dot1 : this.dot0) : this.dot
    dotToFocus.focus()

    if (pixelPosition >= range[0] && pixelPosition <= range[1]) {
      if (this.currentSliderDotIndex) {
        if (pixelPosition <= this.position[0]) {
          // @ts-ignore
          this.val[1] = this.val[0]
          this.currentSliderDotIndex = 0
        }
        const v = this.getValueByIndex(Math.round(pixelPosition / this.gap))
        this.setCurrentValue(v)
      } else {
        if (pixelPosition >= this.position[1]) {
          // @ts-ignore
          this.val[0] = this.val[1]
          this.currentSliderDotIndex = 1
        }
        const v = this.getValueByIndex(Math.round(pixelPosition / this.gap))
        this.setCurrentValue(v)
      }
    } else if (pixelPosition < range[0]) {
      this.setCurrentValue(valueRange[0])
    } else {
      this.setCurrentValue(valueRange[1])
    }
  }

  // setTransform () {
  //   if (this.isRange) {
  //     const slider = this.currentSliderDotIndex
  //     const difference = 100 / (this.max - this.min)
  //     const val0 = (this.value[0] - this.min) * difference
  //     const processPosition = `${val0}%`

  //     if (slider === 0) {
  //       this.dot0.style[this.pinPositionStyle] = `calc(${processPosition} - 8px)`
  //       this.dot0.focus()
  //     } else {
  //       this.dot1.style[this.pinPositionStyle] = `calc(${processPosition} - 8px)`
  //       this.dot1.focus()
  //     }
  //   } else {
  //     const val = ((this.value - this.min) / (this.max - this.min)) * 100

  //     this.dot.style[this.pinPositionStyle] = `calc(${val} - 8px)`
  //     this.dot.focus()
  //   }
  // }

  // normalizeValue (value: any) {
  //   const currentRest = value % this.step
  //   if ((currentRest / this.step) >= 0.5) {
  //     value = value + (this.step - currentRest)
  //   } else {
  //     value = value - currentRest
  //   }
  //   return value
  // }

  limitValue (val: any) {
    const inRange = (v: any) => {
      if (v < this.min) {
        return this.min
      } else if (v > this.max) {
        return this.max
      }
      return v
    }

    if (this.isRange) {
      if (val[0] >= val[1] && this.currentSliderDotIndex === 0) {
        const v = inRange(val[1])
        return [v, v]
      }
      if (val[0] >= val[1] && this.currentSliderDotIndex === 1) {
        const v = inRange(val[0])
        return [v, v]
      }
      return val.map((v: any) => inRange(v))
    } else {
      return inRange(val)
    }
  }

  isDiff (a: any, b: any) {
    return JSON.stringify(a) !== JSON.stringify(b)
  }

  clickOnContainer (e: any) {
    if (this.disabled || this.readonly) {
      return
    }
    const pos = this.getPos(e)
    if (this.isRange) {
      this.currentSliderDotIndex = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
    }
    this.setMouseDown(e, this.currentSliderDotIndex)
    this.setValueOnPos(pos)
    this.moveStart(e, this.currentSliderDotIndex)
  }

  mounted () {
    this.$nextTick(() => {
      if (validateSlider(this.modelValue, this.step, this.min, this.max)) {
        this.getStaticData()
        this.bindEvents()
      }
    })
  }

  beforeUnmount () {
    this.unbindEvents()
  }
}
</script>

<style lang='scss'>
@import "../../vuestic-sass/resources/resources";

.va-slider {
  display: flex;
  align-items: center;

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
    border-radius: 0.25rem;
    transition: 0.5s ease-out;
    opacity: 0.2;

    &--active {
      transition: 0s;
    }
  }

  &__track--selected {
    opacity: 1;
  }

  &__handler {
    position: absolute;
    width: 1.25rem;
    height: 1.25rem;
    background: $white;
    border: 0.375rem solid;
    border-radius: 50%;
    outline: none !important;
    left: -0.375rem;
    transition: 0s;

    &__dot--focus {
      transform: translate(-0.625rem, -0.625rem);
      display: block;
      width: 1.75rem;
      height: 1.75rem;
      position: absolute;
      border-radius: 50%;
      opacity: 0.2;
      pointer-events: none;
    }

    &__dot--value {
      transform: translate(-50%, -100%);
      user-select: none;
      font-size: 0.625rem;
      letter-spacing: 0.6px;
      line-height: 1.2;
      font-weight: $font-weight-bold;
      text-transform: uppercase;
    }
  }

  .va-input__label {
    user-select: none;
    font-size: 0.625rem;
    letter-spacing: 0.6px;
    line-height: 1.2;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
  }

  .va-input__label--inverse {
    user-select: none;
    font-size: 0.625rem;
    letter-spacing: 0.6px;
    line-height: 1.2;
    font-weight: $font-weight-bold;
    text-transform: uppercase;
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
    flex-basis: 8.33333%;
    flex-grow: 0;
    max-width: 8.33333%;
    margin-right: 1rem;
    min-width: 2.5rem;

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
      height: 0.5rem;
      width: 100%;
    }

    &__mark {
      position: absolute;
      width: 0.125rem;
      height: 0.75rem;
    }

    &__handler {
      transform: translateX(-50%);

      &--inactive {
        transition: left 0.5s ease-out;
      }

      &__dot--value {
        position: absolute;
        top: -8px;
        left: 50%;
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
  height: 100%;
  padding: 12px 0 12px 0;
  flex-direction: column;
  align-items: center;

  .va-input__label {
    margin-bottom: 0.625rem;
  }

  .va-input__label--inverse {
    left: -0.375rem;
    margin-top: 0.625rem;
  }

  .va-slider {
    &__input-wrapper {
      flex-basis: fit-content;
      flex-grow: 0;
      max-width: 1rem;
      min-width: 2.5rem;
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
      height: 100%;
      width: 0.5rem;
      bottom: 0;
    }

    &__mark {
      position: absolute;
      width: 0.75rem;
      height: 0.125rem;
      left: -2px;
    }

    &__handler {
      transform: translateY(50%);

      &--inactive {
        transition: bottom 0.5s ease-out;
      }

      &__dot--value {
        position: relative;
        top: 0.625rem;
        left: 1.25rem;
      }
    }
  }
}
</style>

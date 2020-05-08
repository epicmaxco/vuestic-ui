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
          :class="{'va-slider__track--active': hasMouseDown}"
          :style="processedStyles"
          @mousedown="moveStart($event, null)"
        />
        <div
          ref="dot0"
          class="va-slider__handler"
          :class="dotClass[0]"
          :style="dottedStyles[0]"
          @mousedown="(moveStart($event, 0), setMouseDown($event, 1))"
          @touchstart="moveStart($event, 0)"
          @focus="KeyboardOnlyFocusMixin_onFocus($event, 1), currentSlider = 0"
          @blur="isKeyboardFocused = false"
          :tabindex="(!disabled && !readonly) && 0"
        >
          <div
            v-if="isActiveDot(0)"
            :style="{ backgroundColor: colorComputed }"
            class="va-slider__handler__dot--focus"
          />
          <div
            v-if="trackLabelVisible"
            :style="labelStyles"
            class="va-slider__handler__dot--value"
          >
            {{ val[0] }}
          </div>
        </div>
        <div
          ref="dot1"
          class="va-slider__handler"
          :class="dotClass[1]"
          :style="dottedStyles[1]"
          @mousedown="(moveStart($event, 1), setMouseDown($event, 2))"
          @touchstart="moveStart($event, 1)"
          @focus="KeyboardOnlyFocusMixin_onFocus($event, 2), currentSlider = 1"
          @blur="isKeyboardFocused = false"
          :tabindex="(!this.disabled && !this.readonly) && 0"
        >
          <div
            v-if="isActiveDot(1)"
            :style="{ backgroundColor: colorComputed }"
            class="va-slider__handler__dot--focus"
          />
          <div
            v-if="trackLabelVisible"
            :style="labelStyles"
            class="va-slider__handler__dot--value"
          >
            {{ val[1] }}
          </div>
        </div>
      </template>
      <template v-else>
        <div
          ref="process"
          class="va-slider__track va-slider__track--selected"
          :class="{'va-slider__track--active': hasMouseDown}"
          :style="processedStyles"
          @mousedown="moveStart($event, 0)"
        />
        <div
          ref="dot"
          class="va-slider__handler"
          :class="dotClass"
          :style="dottedStyles"
          @mousedown="(moveStart(), setMouseDown())"
          @touchstart="moveStart()"
          @focus="onFocus"
          @blur="isKeyboardFocused = false"
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

<script>
import { validateSlider } from './validateSlider'
import { getHoverColor } from '../../../services/color-functions'
import VaIcon from '../va-icon/VaIcon'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { KeyboardOnlyFocusMixin } from '../va-checkbox/KeyboardOnlyFocusMixin'
import {
  ContextPluginMixin,
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaSlider',
  components: {
    VaIcon,
  },
  mixins: [
    ColorThemeMixin,
    KeyboardOnlyFocusMixin,
    ContextPluginMixin,
    makeContextablePropsMixin({
      range: { type: Boolean, default: false },
      value: { type: [Number, Array], default: () => [] },
      trackLabel: { type: String, default: '' },
      color: { type: String, default: 'primary' },
      trackColor: { type: String, default: 'primary' },
      labelColor: { type: String, default: 'primary' },
      trackLabelVisible: { type: Boolean, default: false },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 100 },
      step: { type: Number, default: 1 },
      label: { type: String, default: '' },
      invertLabel: { type: Boolean, default: false },
      disabled: { type: Boolean, default: false },
      readonly: { type: Boolean, default: false },
      pins: { type: Boolean, default: false },
      iconPrepend: { type: String, default: '' },
      iconAppend: { type: String, default: '' },
      vertical: { type: Boolean, default: false },
      showTrack: { type: Boolean, default: true },
    }),
  ],
  data () {
    return {
      flag: false,
      size: 0,
      currentValue: this.value,
      currentSlider: 0,
      isComponentExists: false,
      dimensions: this.vertical ? ['height', 'bottom'] : ['width', 'left'],
    }
  },
  computed: {
    moreToLess () {
      return this.val[1] - this.step < this.val[0]
    },
    lessToMore () {
      return this.val[0] + this.step > this.val[1]
    },
    sliderClass () {
      return {
        'va-slider--active': this.hasMouseDown,
        'va-slider--disabled': this.disabled,
        'va-slider--readonly': this.readonly,
        'va-slider--horizontal': !this.vertical,
        'va-slider--vertical': this.vertical,
      }
    },
    dotClass () {
      if (this.range) {
        return [
          { 'va-slider__handler--inactive': !this.hasMouseDown },
          { 'va-slider__handler--inactive': !this.hasMouseDown },
        ]
      }

      return {
        'va-slider__handler--on-focus': !this.range && (this.flag || this.isKeyboardFocused),
        'va-slider__handler--inactive': !this.hasMouseDown,
      }
    },
    labelStyles () {
      return {
        color: this.labelColor ? this.computeColor(this.labelColor) : this.colorComputed,
      }
    },
    trackStyles () {
      return {
        backgroundColor: this.trackColor
          ? this.computeColor(this.trackColor)
          : getHoverColor(this.colorComputed),
      }
    },
    processedStyles () {
      const validatedValue = this.limitValue(this.value)

      if (this.range) {
        const val0 = ((validatedValue[0] - this.min) / (this.max - this.min)) * 100
        const val1 = ((validatedValue[1] - this.min) / (this.max - this.min)) * 100

        return {
          [this.dimensions[1]]: `${val0}%`,
          [this.dimensions[0]]: `${val1 - val0}%`,
          backgroundColor: this.colorComputed,
          visibility: this.showTrack ? 'visible' : 'hidden',
        }
      } else {
        const val = ((validatedValue - this.min) / (this.max - this.min)) * 100

        return {
          [this.dimensions[0]]: `${val}%`,
          backgroundColor: this.colorComputed,
          visibility: this.showTrack ? 'visible' : 'hidden',
        }
      }
    },
    dottedStyles () {
      const validatedValue = this.limitValue(this.value)

      if (this.range) {
        const val0 = ((validatedValue[0] - this.min) / (this.max - this.min)) * 100
        const val1 = ((validatedValue[1] - this.min) / (this.max - this.min)) * 100

        return [
          {
            [this.dimensions[1]]: `calc(${val0}% - 8px)`,
            backgroundColor: this.isActiveDot(0) ? this.colorComputed : '#ffffff',
            borderColor: this.colorComputed,
          },
          {
            [this.dimensions[1]]: `calc(${val1}% - 8px)`,
            backgroundColor: this.isActiveDot(1) ? this.colorComputed : '#ffffff',
            borderColor: this.colorComputed,
          },
        ]
      } else {
        const val = ((validatedValue - this.min) / (this.max - this.min)) * 100

        return {
          [this.dimensions[1]]: `calc(${val}% - 8px)`,
          backgroundColor: this.isActiveDot(0) ? this.colorComputed : '#ffffff',
          borderColor: this.colorComputed,
        }
      }
    },
    val: {
      get () {
        return this.value
      },
      set (val) {
        if (!this.range) {
          val = this.limitValue(val)
        }
        if (!this.flag) {
          this.$emit('change', val)
        }
        this.$emit('input', val)
      },
    },
    total () {
      return (this.max - this.min) / this.step
    },
    gap () {
      return this.size / this.total
    },
    multiple () {
      const decimals = `${this.step}`.split('.')[1]
      return decimals ? Math.pow(10, decimals.length) : 1
    },
    interval () {
      return this.value[1] - this.value[0]
    },
    pinsCol () {
      return (this.max / this.step) - 1
    },
    position () {
      return this.isRange ? [(this.value[0] - this.min) / this.step * this.gap, (this.value[1] - this.min) / this.step * this.gap] : ((this.value - this.min) / this.step * this.gap)
    },
    limit () {
      return [0, this.size]
    },
    valueLimit () {
      return [this.min, this.max]
    },
    isRange () {
      return Array.isArray(this.value)
    },
  },
  watch: {
    val (val) {
      validateSlider(val, this.step, this.min, this.max)
    },
    max (val) {
      if (val < this.min) {
        validateSlider(this.value, this.step, val, this.max)
      }
    },
    min (val) {
      if (val > this.max) {
        validateSlider(this.value, this.step, this.min, val)
      }
    },
    hasMouseDown (val) {
      if (val) {
        document.documentElement.style.cursor = 'grabbing'
      } else {
        document.documentElement.style.cursor = null
      }
    },
  },
  methods: {
    onFocus () {
      this.KeyboardOnlyFocusMixin_onFocus()
    },
    bindEvents () {
      document.addEventListener('mousemove', this.moving)
      document.addEventListener('touchmove', this.moving)
      document.addEventListener('mouseup', this.moveEnd)
      document.addEventListener('mouseleave', this.moveEnd)
      document.addEventListener('touchcancel', this.moveEnd)
      document.addEventListener('touchend', this.moveEnd)
      document.addEventListener('keydown', this.moveWithKeys)
    },
    unbindEvents () {
      document.removeEventListener('mousemove', this.moving)
      document.removeEventListener('touchmove', this.moving)
      document.removeEventListener('mouseup', this.moveEnd)
      document.removeEventListener('mouseleave', this.moveEnd)
      document.removeEventListener('touchcancel', this.moveEnd)
      document.removeEventListener('touchend', this.moveEnd)
      document.removeEventListener('keydown', this.moveWithKeys)
    },
    isActiveDot (index) {
      if ((!this.isKeyboardFocused && !this.flag) || this.disabled || this.readonly) {
        return false
      }

      return this.range ? this.currentSlider === index : this.currentSlider === 0
    },
    setMouseDown (e, index) {
      if (!this.readonly && !this.disabled) {
        this.hasMouseDown = index || true
      }
    },
    moveStart (e, index) {
      if (!index) {
        if (!this.range) {
          index = 0
        } else {
          const pos = this.getPos(e)
          index = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
        }
      }

      if (this.isRange) {
        this.currentSlider = index
      }

      this.flag = true
      this.$emit('dragStart')
    },
    moving (e) {
      if (!this.hasMouseDown) return
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
    },
    moveEnd () {
      if (!this.disabled && !this.readonly) {
        if (this.flag) {
          this.$emit('dragEnd')
          this.$emit('change', this.range ? Array.from(this.value) : this.value)
        } else {
          return false
        }
        this.flag = false
        this.hasMouseDown = false
      }
    },
    moveWithKeys (event) {
      // don't do anything if a dot isn't focused or if the slider's disabled or readonly
      if (![this.$refs.dot0, this.$refs.dot1, this.$refs.dot].includes(document.activeElement)) return
      if (this.disabled || this.readonly) return

      /*
        where: where to move
          0 - to left
          1 - to right

        which: which dot to move (only makes sence when isRange is true)
          0 - left dot
          1 - right dot
       */
      const moveDot = (isRange, where, which) => {
        if (isRange) {
          if (!this.pins) return this.val.splice(which, 1, this.val[which] + (where ? this.step : -this.step))

          // how many value units one pin occupies
          const onePinInterval = (this.max - this.min) / (this.pinsCol + 1)
          // how many full pins are to the left of the dot now
          const fullPinsNow = this.val[which] / onePinInterval | 0
          // the value of the nearest pin
          let nearestPinVal = fullPinsNow * onePinInterval

          if (this.val[which] !== nearestPinVal) { // if the dot's not pinned already
            nearestPinVal += where ? onePinInterval : 0 // take one more pin if moving right
            this.val.splice(which, 1, nearestPinVal)
          } else {
            this.val.splice(which, 1, this.val[which] + (where ? this.step : -this.step))
          }
        } else {
          if (!this.pins) {
            this.val += where ? this.step : -this.step
            return
          }

          // how many value units one pin occupies
          const onePinInterval = (this.max - this.min) / (this.pinsCol + 1)
          // how many full pins are to the left of the dot now
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
        const isVerticalDot0More = (event) =>
          this.vertical && this.$refs.dot0 === document.activeElement && event.keyCode === CODE_UP
        const isVerticalDot0Less = (event) => this.vertical && this.$refs.dot0 === document.activeElement && event.keyCode === CODE_DOWN
        const isVerticalDot1More = (event) => this.vertical && this.$refs.dot1 === document.activeElement && event.keyCode === CODE_UP
        const isVerticalDot1Less = (event) => this.vertical && this.$refs.dot1 === document.activeElement && event.keyCode === CODE_DOWN
        const isHorizontalDot0Less = (event) =>
          !this.vertical && this.$refs.dot0 === document.activeElement && event.keyCode === CODE_LEFT
        const isHorizontalDot0More = (event) =>
          !this.vertical && this.$refs.dot0 === document.activeElement && event.keyCode === CODE_RIGHT
        const isHorizontalDot1Less = (event) =>
          !this.vertical && this.$refs.dot1 === document.activeElement && event.keyCode === CODE_LEFT
        const isHorizontalDot1More = (event) =>
          !this.vertical && this.$refs.dot1 === document.activeElement && event.keyCode === CODE_RIGHT

        switch (true) {
          case (isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && this.moreToLess && this.val[0] !== this.min:
            this.$refs.dot0.focus()
            moveDot(true, 0, 0)
            break
          case (isVerticalDot0More(event) || isHorizontalDot0More(event)) && this.lessToMore && this.val[1] !== this.max:
            this.$refs.dot1.focus()
            moveDot(true, 1, 1)
            break
          case (isVerticalDot0Less(event) || isHorizontalDot0Less(event)) && this.val[0] !== this.min:
            moveDot(true, 0, 0)
            break
          case (isVerticalDot1More(event) || isHorizontalDot1More(event)) && this.val[1] !== this.max:
            moveDot(true, 1, 1)
            break
          case (isVerticalDot1Less(event) || isHorizontalDot1Less(event)) && this.val[1] !== this.min:
            moveDot(true, 0, 1)
            break
          case (isVerticalDot0More(event) || isHorizontalDot0More(event)) && this.val[0] !== this.max:
            moveDot(true, 1, 0)
            break
          default:
            break
        }
      } else {
        if (this.vertical) {
          if (event.keyCode === CODE_DOWN) moveDot(false, 0)
          if (event.keyCode === CODE_UP) moveDot(false, 1)
        } else {
          if (event.keyCode === CODE_LEFT) moveDot(false, 0)
          if (event.keyCode === CODE_RIGHT) moveDot(false, 1)
        }
      }
    },
    // wrapClick (e) {
    //   if (!this.disabled && !this.readonly && !this.flag) {
    //     const pos = this.getPos(e)
    //     if (this.isRange) {
    //       this.currentSlider = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
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
    checkActivePin (pin) {
      if (this.isRange) {
        return pin * this.step > this.val[0] && pin * this.step < this.val[1]
      } else {
        return pin * this.step < this.val
      }
    },
    getPinStyles (pin) {
      return {
        backgroundColor: this.checkActivePin(pin) ? this.colorComputed : getHoverColor(this.colorComputed),
        [this.dimensions[1]]: `${pin * this.step}%`,
        transition: this.hasMouseDown ? 'none' : 'background-color .3s ease-out .1s',
      }
    },
    getPos (e) {
      this.getStaticData()
      return this.vertical ? this.offset - e.clientY : e.clientX - this.offset
    },
    getStaticData () {
      if (this.$refs.sliderContainer) {
        this.size = this.$refs.sliderContainer[this.vertical ? 'offsetHeight' : 'offsetWidth']
        this.offset = this.$refs.sliderContainer.getBoundingClientRect()[this.dimensions[1]]
      }
    },
    getValueByIndex (index) {
      return ((this.step * this.multiple) * index + (this.min * this.multiple)) / this.multiple
    },
    setCurrentValue (val) {
      const slider = this.currentSlider
      if (this.isRange) {
        if (this.isDiff(this.currentValue[slider], val)) {
          this.currentValue.splice(slider, 1, val)
          if (slider === 0) {
            this.val = [this.currentValue.splice(slider, 1, val)[0], this.value[1]]
            this.currentValue = [this.currentValue.splice(slider, 1, val)[0], this.value[1]]
          } else {
            this.val = [this.value[0], this.currentValue.splice(slider, 1, val)[0]]
            this.currentValue = [this.value[0], this.currentValue.splice(slider, 1, val)[0]]
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
    },
    setValueOnPos (pixelPosition) {
      const range = this.limit
      const valueRange = this.valueLimit

      this.setTransform()

      if (pixelPosition >= range[0] && pixelPosition <= range[1]) {
        if (this.currentSlider) {
          if (pixelPosition <= this.position[0]) {
            this.val[1] = this.val[0]
            this.currentSlider = 0
          }
          const v = this.getValueByIndex(Math.round(pixelPosition / this.gap))
          this.setCurrentValue(v)
        } else {
          if (pixelPosition >= this.position[1]) {
            this.val[0] = this.val[1]
            this.currentSlider = 1
          }
          const v = this.getValueByIndex(Math.round(pixelPosition / this.gap))
          this.setCurrentValue(v)
        }
      } else if (pixelPosition < range[0]) {
        this.setCurrentValue(valueRange[0])
      } else {
        this.setCurrentValue(valueRange[1])
      }
    },
    setTransform () {
      if (this.isRange) {
        const slider = this.currentSlider
        const difference = 100 / (this.max - this.min)
        const val0 = (this.value[0] - this.min) * difference
        const val1 = (this.value[1] - this.min) * difference
        const processSize = `${val1 - val0}%`
        const processPosition = `${val0}%`

        this.$refs.process.style[this.dimensions[0]] = processSize
        this.$refs.process.style[this.dimensions[1]] = processPosition

        if (slider === 0) {
          this.$refs.dot0.style[this.dimensions[1]] = `calc('${processPosition} - 8px)`
          this.$refs.dot0.focus()
        } else {
          this.$refs.dot1.style[this.dimensions[1]] = `calc('${processPosition} - 8px)`
          this.$refs.dot1.focus()
        }
      } else {
        const val = ((this.value - this.min) / (this.max - this.min)) * 100

        this.$refs.process.style[this.dimensions[0]] = `${val}%`
        this.$refs.dot.style[this.dimensions[1]] = `calc('${val} - 8px)`
      }
    },
    normalizeValue (value) {
      const currentRest = value % this.step
      if ((currentRest / this.step) >= 0.5) {
        value = value + (this.step - currentRest)
      } else {
        value = value - currentRest
      }
      return value
    },
    limitValue (val) {
      const inRange = (v) => {
        if (v < this.min) {
          return this.min
        } else if (v > this.max) {
          return this.max
        }
        return v
      }

      if (this.isRange) {
        if (val[0] >= val[1] && this.currentSlider === 0) {
          return [val[1], val[1]]
        }
        if (val[0] >= val[1] && this.currentSlider === 1) {
          return [val[0], val[0]]
        }
        return val.map((v) => inRange(v))
      } else {
        return inRange(val)
      }
    },
    isDiff (a, b) {
      return JSON.stringify(a) !== JSON.stringify(b)
    },
    clickOnContainer (e) {
      if (this.disabled || this.readonly) {
        return
      }
      const pos = this.getPos(e)
      if (this.isRange) {
        this.currentSlider = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
      }
      this.setMouseDown()
      this.setValueOnPos(pos)
      this.moveStart(e)
    },
  },
  mounted () {
    this.$nextTick(() => {
      if (validateSlider(this.value, this.step, this.min, this.max)) {
        this.getStaticData()
        this.bindEvents()
      }
    })
  },
  beforeDestroy () {
    this.unbindEvents()
  },
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
    transition: none;
    opacity: 0.2;
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
    transition: none;

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
      font-weight: bold;
      text-transform: uppercase;
    }
  }

  .va-input__label {
    user-select: none;
    font-size: 0.625rem;
    letter-spacing: 0.6px;
    line-height: 1.2;
    font-weight: bold;
    text-transform: uppercase;
  }

  .va-input__label--inverse {
    user-select: none;
    font-size: 0.625rem;
    letter-spacing: 0.6px;
    line-height: 1.2;
    font-weight: bold;
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
      &--inactive {
        transition: left 0.3s ease-out;
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
      &--inactive {
        transition: bottom 0.3s ease-out;
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

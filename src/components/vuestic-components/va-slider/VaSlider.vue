<template>
  <div
    class="va-slider"
    :class="sliderClass"
  >
    <div
      class="input-wrapper"
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
        class="label"
      >
        {{ label }}
      </span>
    </slot>
    <span
      v-if="iconPrepend"
      class="label"
    >
      <va-icon
        :name="iconPrepend"
        :color="colorComputed"
        :size="16"
      />
    </span>
    <div
      class="container"
      @click="wrapClick"
      ref="sliderContainer"
    >
      <div
        class="container__track"
        :style="trackStyles"
      />
      <template v-if="pins">
        <div
          v-for="(pin, key) in pinsCol"
          :key="key"
          class="container__mark"
          :class="{ 'container__mark--active': checkActivePin(pin) }"
          :style="getPinStyles(pin)"
        />
      </template>
      <template v-if="isRange">
        <div
          ref="process"
          class="container__track"
          :class="{'container__track--active': hasMouseDown, 'container__track--inactive': !hasMouseDown}"
          :style="processedStyles"
          @mousedown="moveStart($event, null)"
        />
        <div
          ref="dot0"
          class="container__handler"
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
            class="container__handler--focus"
          />
          <div
            v-if="trackLabelVisible"
            :style="labelStyles"
            class="container__handler-value"
          >
            {{ val[0] }}
          </div>
        </div>
        <div
          ref="dot1"
          class="container__handler"
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
            class="container__handler--focus"
          />
          <div
            v-if="trackLabelVisible"
            :style="labelStyles"
            class="container__handler-value"
          >
            {{ val[1] }}
          </div>
        </div>
      </template>
      <template v-else>
        <div
          ref="process"
          class="container__track"
          :class="{'container__track--active': hasMouseDown, 'container__track--inactive': !hasMouseDown}"
          :style="processedStyles"
          @mousedown="moveStart($event, 0)"
        />
        <div
          ref="dot"
          class="container__handler"
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
            class="container__handler--focus"
            :style="{ backgroundColor: colorComputed }"
          />
          <div
            v-if="trackLabelVisible"
            :style="labelStyles"
            class="container__handler-value"
          >
            {{ trackLabel || val }}
          </div>
        </div>
      </template>
    </div>
    <span
      v-if="iconAppend"
      class="inverse-label"
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
        class="label inverse-label"
      >
        {{ label }}
      </span>
    </slot>
    <div
      class="input-wrapper"
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
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaSlider',
  components: {
    VaIcon,
  },
  mixins: [ColorThemeMixin, KeyboardOnlyFocusMixin, ContextPluginMixin],
  props: {
    range: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'range', false)
      },
    },
    value: {
      type: [Number, Array],
      default () {
        return getContextPropValue(this, 'value', [])
      },
    },
    trackLabel: {
      type: String,
      default () {
        return getContextPropValue(this, 'trackLabel', '')
      },
    },
    color: {
      type: String,
      default () {
        return getContextPropValue(this, 'color', '')
      },
    },
    trackColor: {
      type: String,
      default () {
        return getContextPropValue(this, 'trackColor', '')
      },
    },
    labelColor: {
      type: String,
      default () {
        return getContextPropValue(this, 'labelColor', '')
      },
    },
    trackLabelVisible: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'trackLabelVisible', false)
      },
    },
    min: {
      type: Number,
      default () {
        return getContextPropValue(this, 'min', 0)
      },
    },
    max: {
      type: Number,
      default () {
        return getContextPropValue(this, 'max', 100)
      },
    },
    step: {
      type: Number,
      default () {
        return getContextPropValue(this, 'step', 1)
      },
    },
    label: {
      type: String,
      default () {
        return getContextPropValue(this, 'label', '')
      },
    },
    invertLabel: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'invertLabel', false)
      },
    },
    disabled: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'disabled', false)
      },
    },
    readonly: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'readOnly', false)
      },
    },
    pins: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'pins', false)
      },
    },
    iconPrepend: {
      type: String,
      default () {
        return getContextPropValue(this, 'iconPrepend', '')
      },
    },
    iconAppend: {
      type: String,
      default () {
        return getContextPropValue(this, 'iconAppend', '')
      },
    },
    vertical: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'vertical', false)
      },
    },
    showTrack: {
      type: Boolean,
      default () {
        return getContextPropValue(this, 'showTrack', true)
      },
    },
  },
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
    sliderClass () {
      return {
        'va-slider--disabled': this.disabled,
        'va-slider--readonly': this.readonly,
        'va-slider--horizontal': !this.vertical,
        'va-slider--vertical': this.vertical,
      }
    },
    dotClass () {
      if (this.range) {
        return [
          { 'container__handler--inactive': !this.hasMouseDown },
          { 'container__handler--inactive': !this.hasMouseDown },
        ]
      }

      return {
        'container__handler--on-focus': !this.range && (this.flag || this.isKeyboardFocused),
        'container__handler--inactive': !this.hasMouseDown,
      }
    },
    labelStyles () {
      return {
        color: this.labelColor ? (this.$themes[this.labelColor] || this.computeColor(this.labelColor)) : this.colorComputed,
      }
    },
    trackStyles () {
      return {
        backgroundColor: this.trackColor
          ? (this.$themes[this.trackColor] || this.computeColor(this.trackColor))
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
      let decimals = `${this.step}`.split('.')[1]
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
          let pos = this.getPos(e)
          index = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
        }
      }

      if (this.isRange) {
        this.currentSlider = index
      }

      this.flag = true
      this.$emit('drag-start', this)
    },
    moving (e) {
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
    moveEnd (e) {
      if (!this.disabled && !this.readonly) {
        if (this.flag) {
          this.$emit('drag-end', this)
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
          let onePinInterval = (this.max - this.min) / (this.pinsCol + 1)
          // how many full pins are to the left of the dot now
          let fullPinsNow = this.val[which] / onePinInterval | 0
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
          let onePinInterval = (this.max - this.min) / (this.pinsCol + 1)
          // how many full pins are to the left of the dot now
          let fullPinsNow = this.val / onePinInterval | 0
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
      // prevent page scroll
      if (arrowKeyCodes.indexOf(event.keyCode) !== -1) {
        event.preventDefault()
      }

      if (this.range) {
        if (this.$refs.dot0 === document.activeElement) { // left dot
          if (this.vertical) {
            if (event.keyCode === 40 && !((this.val[0] - this.step) < this.min)) moveDot(true, 0, 0)
            if (event.keyCode === 38 && !((this.val[0] + this.step) > this.val[1])) moveDot(true, 1, 0)
          } else {
            if (event.keyCode === 37 && !((this.val[0] - this.step) < this.min)) moveDot(true, 0, 0)
            if (event.keyCode === 39 && !((this.val[1] - this.step) < this.val[0])) moveDot(true, 1, 0)
          }
        } else if (this.$refs.dot1 === document.activeElement) { // right dot
          if (this.vertical) {
            if (event.keyCode === 40 && !((this.val[1] - this.step) < this.val[0])) moveDot(true, 0, 1)
            if (event.keyCode === 38 && !((this.val[1] + this.step) > this.max)) moveDot(true, 1, 1)
          } else {
            if (event.keyCode === 37 && !((this.val[1] - this.step) < this.val[0])) moveDot(true, 0, 1)
            if (event.keyCode === 39 && !((this.val[1] + this.step) > this.max)) moveDot(true, 1, 1)
          }
        }
      } else {
        if (this.vertical) {
          if (event.keyCode === 40) moveDot(false, 0)
          if (event.keyCode === 38) moveDot(false, 1)
        } else {
          if (event.keyCode === 37) moveDot(false, 0)
          if (event.keyCode === 39) moveDot(false, 1)
        }
      }
    },
    wrapClick (e) {
      if (!this.disabled && !this.readonly && !this.flag) {
        let pos = this.getPos(e)
        if (this.isRange) {
          this.currentSlider = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
        }
        this.setValueOnPos(pos)
        if (this.pins) {
          if (this.isRange) {
            if (this.currentValue[0] % this.step !== 0) {
              this.currentValue[0] = this.normalizeValue(this.currentValue[0])
              this.val = [this.currentValue[0], this.val[1]]
            }
            if (this.currentValue[1] % this.step !== 0) {
              this.currentValue[1] = this.normalizeValue(this.currentValue[1])
              this.val = [this.val[0], this.currentValue[1]]
            }
          } else {
            this.currentValue = this.normalizeValue(this.currentValue)
            this.val = this.currentValue
          }
        }
      }
    },
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
      let slider = this.currentSlider
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
            this.currentSlider = 0
          }
          let v = this.getValueByIndex(Math.round(pixelPosition / this.gap))
          this.setCurrentValue(v)
        } else {
          if (pixelPosition >= this.position[1]) {
            this.currentSlider = 1
          }
          let v = this.getValueByIndex(Math.round(pixelPosition / this.gap))
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
        } else {
          this.$refs.dot1.style[this.dimensions[1]] = `calc('${processPosition} - 8px)`
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

  .input-wrapper {
    position: relative;
    display: flex;
  }

  .container {
    position: relative;
    display: flex;
    align-items: center;

    &__track {
      position: absolute;
      border-radius: 0.25rem;
      transition: none;
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

      &:hover {
        cursor: pointer;
      }

      &--focus {
        transform: translate(-0.625rem, -0.625rem);
        display: block;
        width: 1.75rem;
        height: 1.75rem;
        position: absolute;
        border-radius: 50%;
        opacity: 0.2;
        pointer-events: none;
      }

      &-value {
        transform: translate(-50%, -100%);
        user-select: none;
        font-size: 0.625rem;
        letter-spacing: 0.6px;
        line-height: 1.2;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  }

  .label {
    user-select: none;
    font-size: 0.625rem;
    letter-spacing: 0.6px;
    line-height: 1.2;
    font-weight: bold;
    text-transform: uppercase;
  }

  .inverse-label {
    user-select: none;
    font-size: 0.625rem;
    letter-spacing: 0.6px;
    line-height: 1.2;
    font-weight: bold;
    text-transform: uppercase;
  }

  &--disabled {
    @include va-disabled;

    .container__handler {
      &:hover {
        cursor: default;
      }
    }
  }

  &--readonly {
    .container__handler {
      &:hover {
        cursor: default;
      }
    }
  }
}

.va-slider--horizontal {
  .input-wrapper {
    flex-basis: 8.33333%;
    flex-grow: 0;
    max-width: 8.33333%;
    margin-right: 1rem;
    min-width: 2.5rem;

    &:last-of-type {
      margin-left: 1rem;
    }
  }

  .container {
    width: 100%;
    height: 1.5rem;

    &__track,
    &__track--active {
      height: 0.5rem;
      width: 100%;
    }

    &__track--inactive {
      transition: width 0.3s ease-out, left 0.3s ease-out;
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

      &-value {
        position: absolute;
        top: -8px;
        left: 50%;
      }
    }
  }

  .label {
    margin-right: 1rem;
  }

  .inverse-label {
    margin-left: 1rem;
  }
}

.va-slider--vertical {
  height: 100%;
  padding: 12px 0 12px 0;
  flex-direction: column;
  align-items: center;

  .input-wrapper {
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

  .container {
    height: 100%;
    width: 0.5rem;

    &__track,
    &__track--active {
      height: 100%;
      width: 0.5rem;
      bottom: 0;
    }

    &__track--inactive {
      transition: height 0.3s ease-out, bottom 0.3s ease-out;
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

      &-value {
        position: relative;
        top: 0.625rem;
        left: 1.25rem;
      }
    }
  }

  .label {
    margin-bottom: 0.625rem;
  }

  .inverse-label {
    left: -0.375rem;
    margin-top: 0.625rem;
  }
}
</style>

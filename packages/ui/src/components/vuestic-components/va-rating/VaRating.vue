<template>
  <div
    class="va-rating"
    :class="classList"
  >
    <div
      @keyup.left="onArrow($event, -1)"
      @keyup.right="onArrow($event, 1)"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      class="va-rating__item-wrapper"
    >
      <template
        v-if="$props.numbers"
      >
        <va-rating-item
          v-for="number in $props.max"
          :key="number"
          class="va-rating__number-item"
          :halves="$props.halves"
          :hover="hoverEnabled"
          :size="$props.size"
          :color="$props.color"
          :empty-icon-color="$props.unselectedColor"
          :tabindex="tabIndex"
          :modelValue="getItemValue(number)"
          @hover="onHover(number, $event)"
          @click="onItemSelected(number, $event)"
        >
          <template v-slot="{ props }">
            <button
              @click="props.onClick"
              class="va-rating__number-item"
              tabindex="-1"
              :style=" {
                background: props.value === 0.5
                  ? `linear-gradient(90deg, ${colorComputed} 50%, ${focusColor} 50%`
                  : !props.value ? focusColor : colorComputed,
                color: props.value ? '#fff' : colorComputed,
                width: sizeComputed,
                height: sizeComputed,
                fontSize: fontSizeComputed,
                borderRadius: `${SizeMixin_fontSize * 0.125}rem`,
              }"
            > {{ number }} </button>
          </template>
        </va-rating-item>
      </template>
      <template v-else>
        <va-rating-item
          v-for="itemNumber in $props.max"
          :key="itemNumber"
          :halves="$props.halves"
          :hover="hoverEnabled"
          :filled-icon-name="$props.icon"
          :half-icon-name="$props.halfIcon"
          :empty-icon-name="$props.emptyIcon"
          :size="$props.size"
          :color="$props.color"
          :empty-icon-color="$props.unselectedColor"
          :tabindex="tabIndex"
          :modelValue="getItemValue(itemNumber)"
          @hover="onHover(itemNumber, $event)"
          @click="onItemSelected(itemNumber, $event)"
        />
      </template>
    </div>
    <span class="va-rating__text-wrapper" v-if="$props.texts.length === $props.max" :style="{ color: computeColor($props.textColor) }">
      {{ $props.texts[Math.round(valueProxy) - 1] }}
    </span>
  </div>
</template>

<script lang="ts">
import { Options, mixins, prop, Vue } from 'vue-class-component'
import { ColorInput } from 'colortranslator/dist/@types'

import { getFocusColor } from '../../../services/color-config/color-functions'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import VaRatingItem from './VaRatingItem'
import { RatingValue } from './VaRating.types'

class RatingProps {
  modelValue = prop<number>({ type: Number, default: 0 })
  icon = prop<string>({ type: String, default: 'star' })
  halfIcon = prop<string>({ type: String, default: 'star_half' })
  emptyIcon = prop<string>({ type: String, default: 'star_empty' })
  readonly = prop<boolean>({ type: Boolean, default: false })
  disabled = prop<boolean>({ type: Boolean, default: false })
  numbers = prop<boolean>({ type: Boolean, default: false })
  halves = prop<boolean>({ type: Boolean, default: false })
  max = prop<number>({ type: Number, default: 5 })
  clearable = prop<boolean>({ type: Boolean, default: false })
  hover = prop<boolean>({ type: Boolean, default: false })
  texts = prop<any[]>({ type: Array, default: () => [] })
  textColor = prop<string>({ type: String })
  unselectedColor = prop<string>({ type: String })
}

const RatingPropsMixin = Vue.with(RatingProps)

@Options({
  name: 'VaRating',
  components: { VaRatingItem },
})
export default class VaRating extends mixins(
  ColorMixin,
  SizeMixin,
  StatefulMixin,
  RatingPropsMixin,
) {
  isHovered = false
  forceEmit = false
  hoveredValue = RatingValue.EMPTY

  mounted () {
    this.hoveredValue = this.valueComputed
  }

  get valueProxy (): number {
    return this.isHovered ? this.hoveredValue : this.valueComputed
  }

  set valueProxy (value: number) {
    this.hoveredValue = value
    if (this.forceEmit) {
      this.valueComputed = value
      this.forceEmit = false
    }
  }

  get focusColor () {
    return this.$props.unselectedColor
      ? this.computeColor(this.$props.unselectedColor)
      : getFocusColor(this.colorComputed as ColorInput)
  }

  get classList () {
    return {
      'va-rating--disabled': this.$props.disabled,
      'va-rating--readonly': this.$props.readonly,
    }
  }

  get interactionsEnabled () {
    return !(this.$props.disabled || this.$props.readonly)
  }

  get hoverEnabled () {
    return this.$props.hover && this.interactionsEnabled
  }

  get tabIndex () {
    return this.interactionsEnabled ? 0 : undefined
  }

  getItemValue (itemNumber: number): RatingValue {
    const diff = itemNumber - this.valueProxy
    switch (true) {
    case diff <= 0: return RatingValue.FULL
    case diff === RatingValue.HALF && this.$props.halves: return RatingValue.HALF
    default: return RatingValue.EMPTY
    }
  }

  onHover (itemNumber: number, value: RatingValue): void {
    this.valueProxy = value === RatingValue.FULL
      ? itemNumber
      : itemNumber - RatingValue.HALF
  }

  onMouseEnter () {
    this.isHovered = (this.hoverEnabled as boolean) && true
  }

  onMouseLeave () {
    this.isHovered = false
  }

  onArrow (event: KeyboardEvent, directon: 1 | -1) {
    const currentValue = this.valueProxy || RatingValue.EMPTY
    const step = this.$props.halves ? RatingValue.HALF : RatingValue.FULL
    const nextValue = currentValue + (step * directon)
    if (nextValue < 0 || nextValue > (this.$props.max as number)) { return }

    this.forceEmit = true
    this.valueProxy = nextValue
  }

  onItemSelected (itemNumber: number, value: RatingValue) {
    if (!this.interactionsEnabled) { return }
    const currentClickedValue = this.$props.halves
      ? value === RatingValue.HALF ? itemNumber - RatingValue.HALF : itemNumber
      : itemNumber
    const valueToEmit = this.$props.clearable && this.valueComputed === currentClickedValue
      ? RatingValue.EMPTY
      : currentClickedValue

    this.forceEmit = true
    this.valueProxy = valueToEmit
  }
}
</script>

<style lang="scss">
@import "../../vuestic-sass/resources/resources";

.va-rating {
  display: flex;

  &__number-item {
    @include normalize-button();

    font-size: inherit;
    margin: 0.1em;
    font-weight: $font-weight-bold;

    @include flex-center();

    cursor: pointer;

    @at-root {
      .va-rating--disabled & {
        @include va-disabled();
      }

      .va-rating--readonly & {
        cursor: default;
      }
    }
  }

  &__item-wrapper {
    display: flex;
    cursor: pointer;

    @at-root {
      .va-rating--readonly &,
      .va-rating--disabled & {
        cursor: default;
      }
    }
  }

  &-item {
    display: flex;

    @include flex-center();

    .va-rating--disabled & {
      @include va-disabled();

      &__wrapper {
        cursor: initial !important;
      }
    }

    .va-rating--readonly & &__wrapper {
      cursor: initial !important;
    }
  }

  &__text-wrapper {
    padding-left: 10px;
  }
}
</style>

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
        v-if="numbers"
      >
        <va-rating-item
          v-for="number in max"
          :key="number"
          class="va-rating__number-item"
          :halves="halves"
          :hover="hoverEnabled"
          :size="size"
          :color="color"
          :empty-icon-color="unselectedColor"
          :tabindex="tabIndex"
          :value="getItemValue(number)"
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
          v-for="itemNumber in max"
          :key="itemNumber"
          :halves="halves"
          :hover="hoverEnabled"
          :filled-icon-name="icon"
          :half-icon-name="halfIcon"
          :empty-icon-name="emptyIcon"
          :size="size"
          :color="color"
          :empty-icon-color="unselectedColor"
          :tabindex="tabIndex"
          :value="getItemValue(itemNumber)"
          @hover="onHover(itemNumber, $event)"
          @click="onItemSelected(itemNumber, $event)"
        />
      </template>
    </div>
    <span class="va-rating__text-wrapper" v-if="texts.length === max" :style="{ color: computeColor(textColor) }">
      {{ texts[Math.round(valueProxy) - 1] }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import VaRatingItem from './VaRatingItem.vue'

import { ColorInput } from 'colortranslator/dist/@types'
import { RatingValue } from './VaRating.types'
import { getFocusColor } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { StatefulMixin } from '../../vuestic-mixins/StatefulMixin/StatefulMixin'

@Component({
  name: 'VaRating',
  components: { VaRatingItem },
})
export default class VaRating extends Mixins(
  ColorThemeMixin,
  SizeMixin,
  StatefulMixin,
) {
  isHovered = false
  forceEmit = false
  hoveredValue = RatingValue.EMPTY

  @Prop({ type: Number, default: 0 }) value!: number
  @Prop({ type: String, default: 'star' }) icon!: string
  @Prop({ type: String, default: 'star_half' }) halfIcon!: string
  @Prop({ type: String, default: 'star_empty' }) emptyIcon!: string
  @Prop({ type: Boolean, default: false }) readonly!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) numbers!: boolean
  @Prop({ type: Boolean, default: false }) halves!: boolean
  @Prop({ type: Number, default: 5 }) max!: number
  @Prop({ type: Boolean, default: false }) clearable!: boolean
  @Prop({ type: Boolean, default: false }) hover!: boolean
  @Prop({ type: Array, default: () => [] }) texts!: any[]
  @Prop({ type: String }) textColor!: string
  @Prop({ type: String }) unselectedColor!: string

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
    return this.unselectedColor
      ? this.computeColor(this.unselectedColor)
      : getFocusColor(this.colorComputed as ColorInput)
  }

  get classList () {
    return {
      'va-rating--disabled': this.disabled,
      'va-rating--readonly': this.readonly,
    }
  }

  get interactionsEnabled () {
    return !(this.disabled || this.readonly)
  }

  get hoverEnabled () {
    return this.hover && this.interactionsEnabled
  }

  get tabIndex () {
    return this.interactionsEnabled ? 0 : undefined
  }

  getItemValue (itemNumber: number): RatingValue {
    const diff = itemNumber - this.valueProxy
    switch (true) {
      case diff <= 0: return RatingValue.FULL
      case diff === RatingValue.HALF && this.halves: return RatingValue.HALF
      default: return RatingValue.EMPTY
    }
  }

  onHover (itemNumber: number, value: RatingValue): void {
    this.valueProxy = value === RatingValue.FULL
      ? itemNumber
      : itemNumber - RatingValue.HALF
  }

  onMouseEnter () {
    this.isHovered = this.hoverEnabled && true
  }

  onMouseLeave () {
    this.isHovered = false
  }

  onArrow (event: KeyboardEvent, directon: 1 | -1) {
    const currentValue = this.valueProxy || RatingValue.EMPTY
    const step = this.halves ? RatingValue.HALF : RatingValue.FULL
    const nextValue = currentValue + (step * directon)
    if (nextValue < 0 || nextValue > this.max) { return }

    this.forceEmit = true
    this.valueProxy = nextValue
  }

  onItemSelected (itemNumber: number, value: RatingValue) {
    if (!this.interactionsEnabled) { return }
    const currentClickedValue = this.halves
      ? value === RatingValue.HALF ? itemNumber - RatingValue.HALF : itemNumber
      : itemNumber
    const valueToEmit = this.clearable && this.valueComputed === currentClickedValue
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

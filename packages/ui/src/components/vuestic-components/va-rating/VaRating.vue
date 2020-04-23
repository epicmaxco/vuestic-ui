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
        v-if="c_numbers"
      >
        <va-rating-item
          v-for="number in c_max"
          :key="number"
          class="va-rating__number-item"
          :halves="c_halves"
          :hover="hoverEnabled"
          :size="c_size"
          :color="c_color"
          :empty-icon-color="c_unselectedColor"
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
              }"
            > {{ number }} </button>
          </template>
        </va-rating-item>
      </template>
      <template v-else>
        <va-rating-item
          v-for="itemNumber in c_max"
          :key="itemNumber"
          :halves="c_halves"
          :hover="hoverEnabled"
          :filled-icon-name="c_icon"
          :half-icon-name="c_halfIcon"
          :empty-icon-name="c_emptyIcon"
          :size="c_size"
          :color="c_color"
          :empty-icon-color="c_unselectedColor"
          :tabindex="tabIndex"
          :value="getItemValue(itemNumber)"
          @hover="onHover(itemNumber, $event)"
          @click="onItemSelected(itemNumber, $event)"
        />
      </template>
    </div>
    <span v-if="c_texts.length === c_max" :style="{ color: computeColor(c_textColor) }">
      {{ c_texts[Math.round(valueProxy) - 1] }}
    </span>
  </div>
</template>

<script lang="ts">
import VaRatingItem from './VaRatingItem.vue'
import { getFocusColor } from '../../../services/color-functions'
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { ContextPluginMixin, makeContextablePropsMixin } from '../../context-test/context-provide/ContextPlugin'
import Component, { mixins } from 'vue-class-component'
import { ColorInput } from 'colortranslator/dist/@types'
import { SizeMixin } from '../../../mixins/SizeMixin'
import { RatingItemValue, RatingValue } from './VaRating.types'
import { StatefulMixin } from '../../vuestic-mixins/StatefullMixin/StatefulMixin'

const RatingPropsMixin = makeContextablePropsMixin({
  value: { type: Number, default: 0 },
  icon: { type: String, default: 'star' },
  halfIcon: { type: String, default: 'star_half' },
  emptyIcon: { type: String, default: 'star_empty' },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  numbers: { type: Boolean, default: false },
  halves: { type: Boolean, default: false },
  max: { type: Number, default: 5 },
  size: { type: [String, Number], default: 'medium' },
  clearable: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
  texts: { type: Array, default: () => [] },
  textColor: { type: String },
  unselectedColor: { type: String },
})

@Component({
  name: 'VaRating',
  components: { VaRatingItem },
})
export default class VaRating extends mixins(
  RatingPropsMixin,
  ColorThemeMixin,
  ContextPluginMixin,
  SizeMixin,
  StatefulMixin,
) {
  private isHovered = false
  private forceEmit = false
  private hoveredValue = 0

  private mounted () {
    this.hoveredValue = this.valueComputed
  }

  private get valueProxy (): number {
    return this.isHovered ? this.hoveredValue : this.valueComputed
  }

  private set valueProxy (value: number) {
    this.hoveredValue = value
    if (this.forceEmit) {
      this.valueComputed = value
      this.forceEmit = false
    }
  }

  private get focusColor () {
    return this.c_unselectedColor
      ? this.computeColor(this.c_unselectedColor)
      : getFocusColor(this.colorComputed as ColorInput)
  }

  private get classList () {
    return {
      'va-rating--disabled': this.c_disabled,
      'va-rating--readonly': this.c_readonly,
    }
  }

  private get interactionsEnabled () {
    return !(this.c_disabled || this.c_readonly)
  }

  private get hoverEnabled () {
    return this.c_hover && this.interactionsEnabled
  }

  private get tabIndex () {
    return this.interactionsEnabled ? 0 : undefined
  }

  private getItemValue (itemNumber: number): RatingItemValue {
    const diff = itemNumber - this.valueProxy
    switch (true) {
      case diff <= 0: return RatingValue.FULL
      case diff === RatingValue.HALF && this.c_halves: return RatingValue.HALF
      default: return RatingValue.EMPTY
    }
  }

  private onHover (itemNumber: number, value: RatingItemValue): void {
    this.valueProxy = value === RatingValue.FULL
      ? itemNumber
      : itemNumber - RatingValue.HALF
  }

  private onMouseEnter () {
    this.isHovered = this.hoverEnabled && true
  }

  private onMouseLeave () {
    this.isHovered = false
  }

  private onArrow (event: KeyboardEvent, directon: 1 | -1) {
    const step = this.c_halves ? RatingValue.HALF : RatingValue.FULL
    const nextValue = this.valueProxy + (step * directon)
    if (nextValue < 0 || nextValue > this.c_max) return

    this.forceEmit = true
    this.valueProxy = nextValue
  }

  private onItemSelected (itemNumber: number, value: RatingItemValue) {
    if (!this.interactionsEnabled) return
    const currentClickedValue = this.c_halves
      ? value === RatingValue.HALF ? itemNumber - RatingValue.HALF : itemNumber
      : itemNumber
    const valueToEmit = this.c_clearable && this.valueComputed === currentClickedValue
      ? 0
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
    border-radius: 0.125rem;
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

      &__wrapper > .va-icon {
        cursor: initial !important;
      }
    }

    .va-rating--readonly & &__wrapper > .va-icon {
      cursor: initial !important;
    }
  }
}
</style>
